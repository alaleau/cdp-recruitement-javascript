import { Country } from "./models/country";
import { Animal } from "./models/animal";
import { People } from "./models/people";
import { countries } from "./data/countries";


const args = process.argv.slice(2);

export function parseArgs(args: string[]): { [key: string]: string } {
  return args.reduce((acc, arg) => {
    const [key, value] = arg.split("=");
    return { ...acc, [key.replace("--", "")]: value ?? "true" };
  }, {});
}

export function serializeName(
  name: string,
  numberOfChildren: number,
  displayCount: boolean,
): string {
  return displayCount ? `${name} [${numberOfChildren}]` : name;
}

export function filterCountries({
  countries,
  search,
  displayCount,
}: {
  countries: Country[];
  search?: string;
  displayCount: boolean;
}): Country[] {
  const filterAnimals = (animals: Animal[]): Animal[] => {
    if (!search) {
      return animals;
    }
    return animals.filter((animal) =>
      animal.name.toUpperCase().includes(search.toUpperCase()),
    );
  };

  const filterPeople = (people: People[]): People[] => {
    return people.reduce((acc: People[], person) => {
      const animals = filterAnimals(person.animals);
      if (animals.length > 0) {
        acc.push({
          name: serializeName(person.name, animals.length, displayCount),
          animals,
        });
      }

      return acc;
    }, []);
  };

    return countries.reduce((acc: Country[], country) => {
      const peoples = filterPeople(country.people);
      if (peoples.length > 0) {
        acc.push({
          name: serializeName(country.name, peoples.length, displayCount),
          people: peoples,
        });
      }
      return acc;
    }, []);
}

export function displayOutput(data: Object): void {
  console.log(JSON.stringify(data, null, 2));
}

const parsedArgs = parseArgs(args);
const filter = parsedArgs.filter;
const displayCount = parsedArgs.hasOwnProperty("count");

const filteredCountries = filterCountries({
  countries: countries,
  search: filter,
  displayCount,
});

displayOutput(filteredCountries);
