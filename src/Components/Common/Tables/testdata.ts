export type Person = {
    name: {
      firstName: string;
      lastName: string;
      isActive: boolean;
    };
    address: string;
    city: string;
    state: string;
  };
  
  //nested data is ok, see accessorKeys in ColumnDef below
  export const MuiTabletestdata: Person[] = [
    {
      name: {
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      },
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky',
    },
    {
      name: {
        firstName: 'Jane',
        lastName: 'Doe',
        isActive: false,
      },
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio',
    },
    {
      name: {
        firstName: 'Joe',
        lastName: 'Doe',
        isActive: true,
      },
      address: '566 Brakus Inlet',
      city: 'South Linda',
      state: 'West Virginia',
    },
    {
      name: {
        firstName: 'Kevin',
        lastName: 'Vandy',
        isActive: false,
      },
      address: '722 Emie Stream',
      city: 'Lincoln',
      state: 'Nebraska',
    },
    {
      name: {
        firstName: 'Joshua',
        lastName: 'Rolluffs',
        isActive: true,
      },
      address: '32188 Larkin Turnpike',
      city: 'Omaha',
      state: 'Nebraska',
    },
  ];