import { Empty, Button } from "antd";
import { Link } from "react-router-dom";
import { RoutePath } from "router/config";

const NotFoundPage = () => {
  return (
    <Empty
      description="Page not found :("
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Link to={RoutePath.main}>
        <Button type="primary">Home page</Button>
      </Link>
    </Empty>
  );
};

export default NotFoundPage;
