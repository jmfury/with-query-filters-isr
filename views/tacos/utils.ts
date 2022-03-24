export default function getAppliedTacoFilters(filterString: string) {
    const filterUrlSearchParams = new URLSearchParams(filterString);
    const filterParams = filterUrlSearchParams.entries();
    const filterParamArr = Array.from(filterParams);
    // Debug
    // console.log({ filterParamArr });
  
    const filterTypeMap: { [x: string]: string } = {
      main: "single",
      toppings: "multiple",
    };
    // Debug
    // console.log({ filterTypeMap });
  
    const appliedFilters = filterParamArr.reduce((acc, next) => {
      const [nextKey, nextValue]: [string, any] = next;
      if (filterTypeMap[nextKey] === "multiple") {
        acc[nextKey] = Array.from(
          new Set([...(acc[nextKey] ? acc[nextKey] : []), nextValue])
        );
        return acc;
      }
      acc[nextKey] = nextValue;
      return acc;
    }, {} as any);

    return appliedFilters
}