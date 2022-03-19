export function TacoList({ tacos }: { tacos: typeof tacoData }) {
  return (
    <ul>
      {tacos?.length > 0
        ? tacos.map((t) => {
            return <li>{JSON.stringify(t, null, 2)}</li>;
          })
        : null}
    </ul>
  );
}

export const tacoData = [
  {
    id: 0,
    main: "sweet potato",
    toppings: ["cilantro", "salsa", "goat cheese"],
  },
  { id: 1, main: "pinto bean", toppings: ["cilantro", "salsa", "goat cheese"] },
  { id: 3, main: "black bean", toppings: ["cilantro", "salsa"] },
  { id: 2, main: "beef", toppings: ["cilantro", "goat cheese"] },
  { id: 4, main: "chicken", toppings: ["cilantro", "salsa", "goat cheese"] },
];
