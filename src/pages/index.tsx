import { GetServerSideProps } from "next";

interface ProtectedPageProps {
  isAuthenticated: boolean;
}

const HomePage = ({ isAuthenticated }: ProtectedPageProps) => {
  if (!isAuthenticated) {
    return <h1>Redirecting to login...</h1>;
  }

  return <center>Welcome to NextJs</center>;
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
