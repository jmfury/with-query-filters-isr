import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { TacoList, tacoData, Taco } from "views/tacos";
import getAppliedTacoFilters from "views/tacos/utils";

interface PageProps {
  tacos: Taco[];
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

  const appliedFilters = getAppliedTacoFilters(filterString);

  const dynamicOptions = getDynamicOptions(tacoData);
  // Debug
  // console.log({ dynamicOptions, appliedFilters });

  const filteredTacos = getFilteredTacos({ appliedFilters, dynamicOptions });

  return {
    props: { tacos: filteredTacos, filterBy: appliedFilters },
  };
}

function getFilteredTacos({ appliedFilters, dynamicOptions }: any) {
  const filterFns = getFilterFns({
    main: appliedFilters.main,
    toppings: appliedFilters.toppings?.filter((str: string) =>
      dynamicOptions.allToppings.includes(str)
    ),
  });
  return Object.values(filterFns).reduce(
    (acc, next) => acc.filter(next),
    tacoData
  );
}

const getDynamicOptions = (
  data: Taco[]
): { allMains: string[]; allToppings: string[] } => {
  return {
    allToppings: Array.from(new Set(data.flatMap((t) => t.toppings))),
    allMains: Array.from(new Set([...data.map((t) => t.main)])),
  };
};

const getFilterFns = ({
  main,
  toppings,
}: {
  main: string;
  toppings: string[];
}) => {
  return {
    ...(!!main ? { main: (taco: Taco) => main === taco.main } : {}),
    ...(!!toppings && toppings.length > 0
      ? {
          toppings: (taco: Taco) =>
            toppings.some((toppingChoice: string) =>
              taco.toppings.some(
                (tacoTopping: string) => toppingChoice === tacoTopping
              )
            ),
        }
      : {}),
  };
};
