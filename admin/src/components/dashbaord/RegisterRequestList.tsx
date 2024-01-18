import {
  Button,
  ConfigProvider,
  Pagination,
  PaginationProps,
  Select,
  Table,
} from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getRegisterRequestList,
  modifyStoreStatus,
} from "../../apis/dashboard";
import { ColumnsType } from "antd/es/table";
import {
  registerRequestItemDto,
  storeStatusModifyDto,
} from "../../recoil/common/interfaces";
import { registerOptions } from "../../recoil/common/options";
import { SuccessToast } from "../common/toast/SuccessToast";
import { FailToast } from "../common/toast/FailToast";
import QuarterDiv from "../fallbacks/QuarterDiv";

export default function RegisterRequestList() {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("ROLE_STORE_MANAGER_PENDING");
  const [isChange, setIsChange] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getRegisterRequestList", status, page, isChange],
    queryFn: () => getRegisterRequestList(status, page - 1, 4),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<registerRequestItemDto> = [
    {
      title: "이름",
      dataIndex: "storeManagerName",
      key: "storeManagerName",
      ellipsis: true,
    },
    {
      title: "사업자등록증",
      dataIndex: "storeManagerBusinessNumber",
      key: "storeManagerBusinessNumber",
      ellipsis: true,
      render: (record) => (
        <a href={record} download target="_blank" rel="noopener noreferrer">
          사업자등록증
        </a>
      ),
    },
    {
      title: "요청일시",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: (
        <Select
          value={status}
          defaultValue={status}
          onChange={(e) => setStatus(e)}
          options={registerOptions}
          style={{ width: 130 }}
        />
      ),
      dataIndex: "",
      key: "state",
      render: (record) => (
        <div>
          {status === "ROLE_STORE_MANAGER_PENDING" ? (
            <div className="flex flex-row gap-2">
              <Button
                type="primary"
                onClick={() =>
                  handleStoreManager(record.key, "ROLE_STORE_MANAGER_PERMITTED")
                }
              >
                승인
              </Button>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FF0000",
                    colorBgContainer: "FF0000",
                  },
                }}
              >
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    handleStoreManager(record.key, "ROLE_STORE_MANAGER_DENIED")
                  }
                >
                  거절
                </Button>
              </ConfigProvider>
            </div>
          ) : status === "ROLE_STORE_MANAGER_PERMITTED" ? (
            <Button style={{ marginLeft: 30 }} disabled>
              승인
            </Button>
          ) : (
            <Button style={{ marginLeft: 30 }} disabled>
              거절
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleStoreManager = (storeManagerId: number, status: string) => {
    const modifyDto = {
      storeManagerId: storeManagerId,
      status: status,
    };
    modifyMutation.mutate(modifyDto);
  };

  const modifyMutation = useMutation(
    ["modifyStoreStatus"],
    (moddifyDto: storeStatusModifyDto) => modifyStoreStatus(moddifyDto),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        SuccessToast("처리되었습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  if (!data || isLoading) return <QuarterDiv />;

  return (
    <div>
      <Table
        dataSource={data.data.data}
        columns={columns}
        pagination={false}
        style={{ height: 380 }}
      />
      <div className="mt-2 text-center">
        <Pagination
          showSizeChanger={false}
          defaultCurrent={page}
          total={data.data.totalCnt}
          defaultPageSize={5}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
