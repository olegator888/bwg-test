import { Pagination, Table } from "antd";
import { questionsTableColumns } from "./config";
import { memo } from "react";
import { QuestionsTableProps } from "components/QuestionsTable/types";
import { useAppDispatch } from "hooks";
import { changePage } from "store/slice";
import { fetchQuestions } from "store/thunks";
import { useNavigate } from "react-router-dom";
import { getQuestionRoute } from "router/config";

const QuestionsTable = ({
  data,
  status,
  page,
  pageSize,
  total,
}: QuestionsTableProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    dispatch(changePage(page));
    dispatch(fetchQuestions());
  };

  return (
    <div>
      <Table
        loading={status === "loading"}
        columns={questionsTableColumns}
        dataSource={data}
        pagination={false}
        rowClassName="cursor-pointer"
        onRow={(record) => {
          return {
            onClick: () =>
              navigate(getQuestionRoute(String(record.question_id))),
          };
        }}
      />
      <Pagination
        className="mt-6"
        current={page}
        onChange={onPageChange}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
};

export default memo(QuestionsTable);
