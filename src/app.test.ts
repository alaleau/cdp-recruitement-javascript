import { describe, it, expect, vi } from "vitest";
import {
  parseArgs,
  serializeName,
  filterCountries, displayOutput,
} from "./app";

describe("parseArgs related tests", () => {
  it("returns empty  when no arguments are provided", () => {
    const args: string[] = [];
    const result = parseArgs(args);
    expect(result).toEqual({});
  });

  it("parses argument with no value as true", () => {
    const args = ["--verbose"];
    const result = parseArgs(args);
    expect(result).toEqual({ verbose: "true" });
  });
});

describe("serializeName related tests", () => {
  it("handles empty name correctly", () => {
    const result = serializeName("", 3, true);
    expect(result).toBe(" [3]");
  });

  it("handles zero count correctly", () => {
    const result = serializeName("John", 0, true);
    expect(result).toBe("John [0]");
  });
});

describe("filterCountries related test", () => {
  const mockData = [
    {
      name: "Dillauti",
      people: [
        {
          name: "Winifred Graham",
          animals: [
            { name: "Anoa" },
            { name: "Duck" },
            { name: "Narwhal" },
            { name: "Badger" },
            { name: "Cobra" },
            { name: "Crow" },
          ],
        },
        {
          name: "Blanche Viciani",
          animals: [
            { name: "Barbet" },
            { name: "Rhea" },
            { name: "Snakes" },
            { name: "Antelope" },
            { name: "Echidna" },
            { name: "Crow" },
            { name: "Guinea Fowl" },
            { name: "Deer Mouse" },
          ],
        },
        {
          name: "Philip Murray",
          animals: [
            { name: "Sand Dollar" },
            { name: "Buzzard" },
            { name: "Elephant" },
            { name: "Xenops" },
            { name: "Dormouse" },
            { name: "Anchovy" },
            { name: "Dinosaur" },
          ],
        },
        {
          name: "Bobby Ristori",
          animals: [
            { name: "Kowari" },
            { name: "Caecilian" },
            { name: "Common Genet" },
            { name: "Chipmunk" },
            { name: "Aardwolf" },
            { name: "Przewalski's Horse" },
            { name: "Badger" },
            { name: "Sand Cat" },
            { name: "Linne's Two-toed Sloth" },
          ],
        },
        {
          name: "Louise Pinzauti",
          animals: [
            { name: "Manta Ray" },
            { name: "Nubian Ibex" },
            { name: "Warbler" },
            { name: "Duck" },
            { name: "Mice" },
          ],
        },
      ],
    },
    {
      name: "Tohabdal",
      people: [
        {
          name: "Effie Houghton",
          animals: [
            { name: "Zebra" },
            { name: "Ring-tailed Lemur" },
            { name: "Fly" },
            { name: "Blue Iguana" },
            { name: "Emu" },
            { name: "African Wild Ass" },
            { name: "Numbat" },
          ],
        },
        {
          name: "Essie Bennett",
          animals: [
            { name: "Aldabra Tortoise" },
            { name: "Patagonian Toothfish" },
            { name: "Giant Panda" },
            { name: "Goat" },
            { name: "Quahog" },
            { name: "Collared Lemur" },
            { name: "Aldabra Tortoise" },
          ],
        },
        {
          name: "Owen Bongini",
          animals: [
            { name: "Zebrashark" },
            { name: "Dogs" },
            { name: "Mouse" },
            { name: "Numbat" },
            { name: "African Wild Dog" },
          ],
        },
        {
          name: "Alexander Fleury",
          animals: [
            { name: "Gelada" },
            { name: "Rattlesnake" },
            { name: "Rabbit" },
            { name: "Aardvark" },
            { name: "Duck" },
            { name: "Courser" },
            { name: "Woodpecker" },
          ],
        },
        {
          name: "Curtis Fuchs",
          animals: [
            { name: "Squirrel" },
            { name: "Falcon" },
            { name: "Cat" },
            { name: "Lobe Coral" },
            { name: "Camel" },
            { name: "Broadclub Cuttlefish" },
          ],
        },
        {
          name: "Maud Lorenzo",
          animals: [
            { name: "Bush Dog" },
            { name: "Sea Urchin" },
            { name: "Gayal" },
            { name: "Tortoise" },
            { name: "Meerkat" },
            { name: "Lion" },
            { name: "Gecko" },
          ],
        },
        {
          name: "Linnie Lamb",
          animals: [
            { name: "Burro" },
            { name: "African Wild Dog" },
            { name: "Slender Snipe Eel" },
            { name: "Red Panda" },
            { name: "Baby Doll Sheep" },
            { name: "California Sea Lion" },
            { name: "Rabbits" },
          ],
        },
        {
          name: "Randall Benoît",
          animals: [
            { name: "Chameleons" },
            { name: "Bee-eater" },
            { name: "King Vulture" },
            { name: "Giant Isopod" },
            { name: "Sand Cat" },
          ],
        },
      ],
    },
  ];

  it("returns empty when no countries match the search", () => {
    const result = filterCountries({
      countries: mockData,
      search: "xxx",
      displayCount: false,
    });
    expect(result).toEqual([]);
  });

  it("returns correct value filtered countries", () => {
    const result = filterCountries({
      countries: mockData,
      search: "whal",
      displayCount: false,
    });
    expect(result).toEqual([
      {
        name: "Dillauti",
        people: [
          {
            animals: [
              {
                name: "Narwhal",
              },
            ],
            name: "Winifred Graham",
          },
        ],
      },
    ]);
  });

  it("returns all countries when search is undefined", () => {
    const result = filterCountries({
      countries: mockData,
      search: undefined,
      displayCount: false,
    });
    expect(result).toEqual(mockData);
  });
});

const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Display Output', () => {
  it('outputs formatted JSON for array', () => {
    const data = [1, 2, 3];
    displayOutput(data);
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    consoleSpy.mockRestore();
  });

  it('outputs formatted JSON for valid object', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const data = { key: 'value' };
    displayOutput(data);
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    consoleSpy.mockRestore();
  });

  it('outputs formatted JSON for empty object', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const data = {};
    displayOutput(data);
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    consoleSpy.mockRestore();
  });

  it('outputs formatted JSON for nested object', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const data = { key: { nestedKey: 'nestedValue' } };
    displayOutput(data);
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    consoleSpy.mockRestore();
  });
});
