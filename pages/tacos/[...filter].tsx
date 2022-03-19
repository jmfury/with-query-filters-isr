import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { TacoList, tacoData } from "views/tacos";

interface PageProps {
  tacos: typeof tacoData;
  filterBy: any;
}

export default function TacoListPage({ tacos, filterBy }: any) {
  return (
    <>
      <pre>
        <code>{JSON.stringify({ filterBy }, null, 2)}</code>
      </pre>
      <TacoList tacos={tacos} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const filterString = params?.filter ? params.filter[0] : "";
  const filterUrlSearchParams = new URLSearchParams(filterString);
  const filterParams = filterUrlSearchParams.entries();

  const filterParamArr = Array.from(filterParams);

  const filterTypeMap = filterParamArr.reduce((acc, next) => {
    const [nextKey] = next;
    const count = filterUrlSearchParams.getAll(nextKey).length;
    if (count > 1) {
      acc[nextKey] = "multiple";
      return acc;
    }
    acc[nextKey] = "single";
    return acc;
  }, {} as any);

  // Debug
  // console.log({ filterTypeMap });

  const filterState = filterParamArr.reduce((acc, next) => {
    const [nextKey, nextValue] = next;
    if (filterTypeMap[nextKey] === "multiple") {
      acc[nextKey] = Array.from(
        new Set([...(acc[nextKey] ? acc[nextKey] : []), nextValue])
      );
      return acc;
    }
    acc[nextKey] = nextValue;
    return acc;
  }, {} as any);

  // Debug
  // console.log({ filterParamArr, filterState });
  return {
    props: { tacos: tacoData, filterBy: filterState },
  };
}
