import { Link, useParams } from "react-router-dom";
import axios from "api";
import { Question } from "types/question";
import { useState, useEffect } from "react";
import { Avatar, Button, Empty, Tag, message } from "antd";
import { RoutePath } from "router/config";
import { AppData } from "types/appSlice";
import { Comment, CommentsData } from "types/comments";
import { PresetColors } from "antd/es/theme/internal";
import { sample } from "lodash";
import CommentCard from "components/CommentCard";
import QuestionPageSkeleton from "pages/QuestionPage/Skeleton";
import { Answer } from "types/answer";

const colors = Array.from(PresetColors);

const QuestionPage = () => {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState<Question | undefined>();
  const [answer, setAnswer] = useState<Answer | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [questionData, commentsData] = await Promise.all([
          axios.get<AppData>(`questions/${params.id}`, {
            params: {
              filter: "withbody",
            },
          }),
          axios.get<CommentsData>(`questions/${params.id}/comments`, {
            params: { filter: "withbody" },
          }),
        ]);

        if (questionData && questionData.data.items[0].accepted_answer_id) {
          setQuestion(questionData.data.items[0]);

          const { data: answer } = await axios.get<{ items: Answer[] }>(
            `answers/${questionData.data.items[0].accepted_answer_id}`,
            {
              params: { filter: "withbody" },
            }
          );

          if (answer) {
            setAnswer(answer.items[0]);
          }
        }

        if (commentsData) {
          setComments(commentsData.data.items);
        }
      } catch (e) {
        console.log(e);
        setError(true);
        message.error("Ошибка при загрузке данных");
      }

      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return <QuestionPageSkeleton />;
  }

  if (error) {
    return (
      <Empty
        description="Произошла непредвиденная ошибка"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex items-center gap-4 justify-center">
          <Link to={RoutePath.main}>
            <Button type="primary">Home page</Button>
          </Link>
          <Button onClick={() => window.location.reload()}>
            Перезагрузить
          </Button>
        </div>
      </Empty>
    );
  }

  if (!question) {
    return (
      <Empty
        description="Вопрос не найден"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Link to={RoutePath.main}>
          <Button type="primary">Home page</Button>
        </Link>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Link to={RoutePath.main}>На главную</Link>
      <div className="text-center flex flex-col items-center gap-1 mt-6 mb-4">
        <div className="flex items-center gap-2">
          <Avatar className="shrink-0" src={question.owner.profile_image} />
          <p>{question.owner.display_name}</p>
        </div>
        <h1
          className="my-2"
          dangerouslySetInnerHTML={{
            __html: question.title || "У вопроса нет темы",
          }}
        />
      </div>
      <div className="mb-4">
        {question.tags?.map((tag) => (
          <Tag key={tag} color={sample(colors)}>
            {tag}
          </Tag>
        ))}
        {!question.tags || (question.tags.length === 0 && <div>Нет тегов</div>)}
      </div>
      <div className="w-full">
        <h2>Вопрос</h2>
        {question.body ? (
          <div
            className="mt-4 w-full"
            dangerouslySetInnerHTML={{ __html: question.body }}
          />
        ) : (
          <div>у вопроса нет тела</div>
        )}
      </div>
      <br />
      <div className="w-full h-[1px] bg-zinc-300" />
      <br />
      {answer ? (
        <div className="p-6 bg-green-100 rounded-xl">
          <h2 className="pl-4">Принятый ответ</h2>
          <div
            className="p-6"
            dangerouslySetInnerHTML={{ __html: answer?.body }}
          ></div>
        </div>
      ) : (
        <div>У этого вопроса нет принятого ответа</div>
      )}
      <div className="flex flex-col gap-4 mt-6 w-full">
        <h2>Комментарии</h2>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-8">
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </div>
        ) : (
          <div>У этого вопроса нет комментариев</div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
