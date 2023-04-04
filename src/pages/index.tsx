import { Transition } from "@headlessui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "~/components/Card";
import ConfirmButton from "~/components/ConfirmButton";
import LoadingButton from "~/components/LoadingButton";
import RandomButton from "~/components/RandomButton";
import { api } from "~/utils/api";

type Inputs = {
  question: string;
};

type QueryInput = {
  text?: string;
  showRandomTopic?: boolean;
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [queryInput, setQueryInput] = useState<QueryInput>();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShowAnswer(false);
    setQueryInput({
      showRandomTopic: false,
      text: data.question,
    });
  };

  const onGetRandomFacts = () => {
    setShowAnswer(false);
    setQueryInput({
      text: undefined,
      showRandomTopic: true,
    });
    void eli5.refetch();
  };

  const eli5 = api.chatGpt.eli5.useQuery(
    {
      ...queryInput,
    },
    {
      enabled: !!queryInput,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: () => {
        setShowAnswer(true);
      },
    }
  );

  return (
    <>
      <Head>
        <title>ELI5</title>
        <meta name="description" content="Ask ChatGpt to explain any topic to you like you are 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            ELI5 by <span className="text-[hsl(280,100%,70%)]">ChatGPT</span>
          </h1>
          <p className="text-lg text-white">
            Explain a topic like I am a 5 year-old
          </p>
        </div>

        <div className="container px-4 lg:px-24">
          <div className="mb-8">
            <form onSubmit={void handleSubmit(onSubmit)}>
              <label
                htmlFor="question"
                className="mb-3 block text-base font-medium text-white"
              >
                Insert your topic
              </label>
              <div className="mb-4">
                <input
                  placeholder="Example: photosynthesis"
                  className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] px-5 py-3 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                  {...register("question", { required: true })}
                />
                {errors.question && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {!eli5.isFetching && <ConfirmButton />}
            </form>

            <div className="mt-4">
              {!eli5.isFetching && <RandomButton onClick={onGetRandomFacts} />}
              {eli5.isFetching && <LoadingButton />}
            </div>
          </div>
        </div>

        <Transition
          show={showAnswer}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          <div className="w-full px-4">
            <Card>
              <h2 className="mb-4 text-center text-lg font-bold capitalize">
                {eli5?.data?.topic}
              </h2>
              <p>{eli5?.data?.answer}</p>
            </Card>
          </div>
        </Transition>
      </main>
    </>
  );
};

export default Home;
