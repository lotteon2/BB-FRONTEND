import { useRef, useState } from "react";
import {
  Button,
  Empty,
  Input,
  Space,
  Typography,
  Table,
  InputRef,
  Modal,
} from "antd";
import { useMutation, useQuery } from "react-query";
import { deleteCoupon, getCouponList } from "../../apis/store";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { ColumnsType, ColumnType } from "antd/es/table";
import {
  couponItemDto,
  couponRegisterDto,
} from "../../recoil/common/interfaces";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { FilterConfirmProps } from "antd/es/table/interface";
import CouponRegisterModal from "./moddal/CouponRegisterModal";
import CouponModifyModal from "./moddal/CouponModifyModal";
import { SuccessToast } from "../common/toast/SuccessToast";
import { FailToast } from "../common/toast/FailToast";
import CouponTableFallback from "../fallbacks/CouponTableFallback";
import CouponDownloadList from "./moddal/CouponDownloadList";

type DataIndex = keyof couponItemDto;
export default function CouponTable() {
  const storeId = useRecoilValue<number>(storeIdState);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [isregisterModal, setIsRegisterModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [couponInfo, setCouponInfo] = useState<couponRegisterDto>({
    couponName: "",
    discountPrice: null,
    minPrice: null,
    limitCount: null,
    startDate: "",
    endDate: "",
  });
  const [couponId, setCouponId] = useState<number>(0);
  const [isShowList, setIsShowList] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getCouponList", isChange],
    queryFn: () => getCouponList(storeId),
  });

  const handleCancel = () => {
    setIsRegisterModal(false);
    setIsModalOpen(false);
    setIsShowList(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleDelete = (key: number) => {
    deleteMutation.mutate(key);
  };

  const deleteMutation = useMutation(
    ["deleteCoupon"],
    (key: number) => deleteCoupon(storeId, key),
    {
      onSuccess: () => {
        SuccessToast("삭제되었습니다.");
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<couponItemDto> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            검색
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            초기화
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: "#000" }}
            onClick={() => {
              close();
            }}
          >
            닫기
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#A843D6" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#DEA9F677", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<couponItemDto> = [
    {
      title: <Typography.Text>쿠폰코드</Typography.Text>,
      key: "couponCode",
      dataIndex: "couponCode",
      width: 100,
      ellipsis: true,
      ...getColumnSearchProps("couponCode"),
    },
    {
      title: "쿠폰명",
      key: "couponName",
      dataIndex: "couponName",
      width: 120,
      ellipsis: true,
      ...getColumnSearchProps("couponName"),
    },
    {
      title: "발행개수",
      key: "limitCount",
      dataIndex: "limitCount",
      width: 100,
      sorter: {
        compare: (a, b) => a.limitCount - b.limitCount,
        multiple: 3,
      },
      render: (record) => <p>{Number(record).toLocaleString()}개</p>,
    },
    {
      title: "잔여량",
      key: "unusedCount",
      dataIndex: "unusedCount",
      width: 100,
      sorter: {
        compare: (a, b) => a.unusedCount - b.unusedCount,
        multiple: 3,
      },
      render: (record) => <p>{Number(record).toLocaleString()}개</p>,
    },
    {
      title: "할인금액",
      key: "discountPrice",
      dataIndex: "discountPrice",
      width: 100,
      ellipsis: true,
      sorter: {
        compare: (a, b) => a.discountPrice - b.discountPrice,
        multiple: 2,
      },
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "최소주문금액",
      key: "minPrice",
      dataIndex: "minPrice",
      width: 130,
      ellipsis: true,
      sorter: {
        compare: (a, b) => a.minPrice - b.minPrice,
        multiple: 1,
      },
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "시작일",
      key: "startDate",
      dataIndex: "startDate",
      width: 120,
    },
    {
      title: "종료일",
      key: "endDate",
      dataIndex: "endDate",
      width: 120,
    },
    {
      title: "",
      dataIndex: "",
      width: 90,
      render: (record) => {
        return (
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
              setCouponInfo({
                couponName: record.couponName,
                discountPrice: record.discountPrice,
                minPrice: record.minPrice,
                limitCount: record.limitCount,
                startDate: record.startDate,
                endDate: record.endDate,
              });
              setCouponId(record.key);
            }}
            disabled={
              new Date(record.endDate) < new Date() ||
              new Date(record.startDate) > new Date()
                ? false
                : true
            }
          >
            수정
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      width: 50,
      render: (record) => (
        <div>
          {new Date(record.endDate) < new Date() ||
          new Date(record.startDate) > new Date() ? (
            <button onClick={() => handleDelete(record.key)}>
              <CloseCircleOutlined />
            </button>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  if (!data || isLoading) return <CouponTableFallback />;

  return (
    <div className="w-full h-full p-3 relative">
      <span className="text-xl font-bold">쿠폰 관리</span>
      <Button
        className="absolute top-3 right-3"
        type="primary"
        onClick={() => setIsRegisterModal(true)}
      >
        쿠폰 등록
      </Button>
      <div className="mt-3">
        {data.data.length === 0 ? (
          <Empty description="등록된 쿠폰 정보가 없습니다." className="mt-72" />
        ) : (
          <Table
            onRow={(record) => {
              return {
                onClick: () => {
                  setCouponId(record.key);
                  setIsShowList(true);
                },
              };
            }}
            columns={columns}
            dataSource={data.data.data}
            pagination={{ position: ["bottomCenter"], pageSize: 11 }}
          ></Table>
        )}
        {isModalOpen ? (
          <CouponModifyModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleChange={handleChange}
            data={couponInfo}
            couponId={couponId}
          />
        ) : (
          ""
        )}
      </div>
      {isregisterModal ? (
        <CouponRegisterModal
          isModalOpen={isregisterModal}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}
      <Modal
        open={isShowList}
        onCancel={handleCancel}
        title="발급 현황"
        width={800}
        footer={[]}
      >
        <CouponDownloadList couponId={couponId} />
      </Modal>
    </div>
  );
}
