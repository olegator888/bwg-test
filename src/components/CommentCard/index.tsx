import { Avatar } from "antd";
import { CommentProps } from "components/CommentCard/types";

const CommentCard = ({ comment }: CommentProps) => {
  return (
    <>
      <div className="flex gap-4 border-[1px] border-zinc-700">
        <Avatar
          size={60}
          className="shrink-0"
          src={comment.owner.profile_image}
        />
        <div className="flex flex-col gap-1">
          <h4 className="mb-1 mt-0">{comment.owner.display_name}</h4>
          <p
            className="m-0"
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-200 last:bg-transparent" />
    </>
  );
};

export default CommentCard;
