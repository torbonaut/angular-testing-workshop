export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  altSpellings: string[];
}

export interface CountryName {
  name: string;
}
