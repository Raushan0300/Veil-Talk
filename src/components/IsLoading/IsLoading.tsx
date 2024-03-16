import { Sentry } from "react-activity";
import "./IsLoading.css";
import "react-activity/dist/Sentry.css";

const IsLoading = () => {
  return (
    <div className="sentryDiv">
      <Sentry
        color="#727981"
        size={32}
        speed={1}
        animating={true}
      />
    </div>
  );
};

export default IsLoading;
