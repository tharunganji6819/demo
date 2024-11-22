import { GetServerSideProps } from "next";
import store from "../redux/index";
import { Provider } from "react-redux";
interface ProtectedPageProps {
  isAuthenticated: boolean;
}

const HomePage = ({ isAuthenticated }: ProtectedPageProps) => {
  if (!isAuthenticated) {
    return <h1>Redirecting to login...</h1>;
  }

  return (
    <Provider store={store}>
      <center>Welcome to NextJs</center>;
    </Provider>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isAuthenticated: true,
    },
  };
};

export default HomePage;
