import type { NextPage, GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

interface Props {
  providers: Promise<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>;
}

const Login: NextPage<Props> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
