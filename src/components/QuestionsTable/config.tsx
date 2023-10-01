import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Question } from "types/question";
import { Link } from "react-router-dom";

export const questionsTableColumns: ColumnsType<Question> = [
  {
    title: "Автор вопроса",
    key: "owner",
    dataIndex: "owner",
    render: (_, { owner }) => (
      <Link to={owner.link} target="_blank">
        {owner.display_name}
      </Link>
    ),
  },
  {
    title: "Тема",
    key: "title",
    dataIndex: "title",
    render: (_, { link, title }) => (
      <Link
        to={link}
        target="_blank"
        className="text-zinc-600 underline"
        dangerouslySetInnerHTML={{ __html: title || "без названия" }}
      />
    ),
  },
  {
    title: "Количество ответов",
    key: "answers_count",
    dataIndex: "answers_count",
    render: (_, { answer_count }) => <div>{answer_count}</div>,
  },
  {
    title: "Теги",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => {
            return (
              <Tag
                key={`${tag}${Math.random() * Date.now()}`}
                style={{ marginBottom: 4 }}
              >
                {tag.toUpperCase()}
              </Tag>
            );
          })}
      </>
    ),
  },
];
