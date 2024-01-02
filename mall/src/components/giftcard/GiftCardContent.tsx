import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { recommandDto } from "../../recoil/common/interfaces";
import { useQuery } from "react-query";
import { getRecommandLetter } from "../../apis/giftcard";
import Loading from "../common/Loading";

interface param {
  recommandDto: recommandDto;
  clickBtn: boolean;
  value: string;
  setValue: (value: string) => void;
}
export default function GiftCardContent(param: param) {
  const { data, isLoading } = useQuery({
    queryKey: ["getRecommandLetter", param.clickBtn],
    queryFn: () => getRecommandLetter(param.recommandDto),
  });

  const formats = ["header"];

  const modules = useMemo(() => {
    return {
      toolbar: false,
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  useEffect(() => {
    if (!data) {
      param.setValue(data);
    }
  }, [data]);

  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={param.value}
        onChange={param.setValue}
        className="w-full h-full overflow-auto"
        modules={modules}
        formats={formats}
        placeholder="내용을 입력해주세요"
      />
    </div>
  );
}
