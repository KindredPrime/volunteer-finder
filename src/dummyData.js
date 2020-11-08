const dummyUsers = [
  {
    id: 1,
    email: 'email1@email.com',
    username: 'user1',
    password: 'password1',
    orgsAdded: [1],
    eventsAdded: [1, 2]
  },
  {
    id: 2,
    email: 'email2@email.com',
    username: 'user2',
    password: 'password2',
    orgsAdded: [2],
    eventsAdded: [3]
  },
  {
    id: 3,
    email: 'email3@email.com',
    username: 'user3',
    password: 'password3',
    orgsAdded: [3],
    eventsAdded: []
  },
  {
    id: 4,
    email: 'email4@email.com',
    username: 'user4',
    password: 'password4',
    orgsAdded: [],
    eventsAdded: []
  },
  {
    id: 5,
    email: 'email5@email.com',
    username: 'user5',
    password: 'password5',
    orgsAdded: [4],
    eventsAdded: [4]
  }
];

const dummyOrgs = [
  {
    id: 1,
    name: 'YMCA',
    website: 'https://www.ymca.com',
    phone: '1-800-555-7777',
    email: 'contact@ymca.com',
    address: '1 YMCA Street Real City, Real State',
    causes: [1, 2, 3],
    tags: [2, 3, 4, 6]
  },
  {
    id: 2,
    name: 'ASPCA',
    website: 'https://www.aspca.com',
    phone: '1-800-123-4567',
    email: 'contact@aspca.com',
    address: '1 ASPCA Street Real City, Real State',
    causes: [5, 2],
    tags: [2, 3, 4, 10]
  },
  {
    id: 3,
    name: 'National VOAD',
    website: 'https://www.nvoad.com',
    phone: '1-800-456-7890',
    email: 'contact@nvoad.com',
    address: '1 NVOAD Street Rivendell, Middle Earth',
    causes: [4, 2],
    tags: [2, 3, 4, 5, 7, 11]
  },
  {
    id: 4,
    name: 'National Air and Space Museum',
    website: 'https://www.airandspace.com',
    phone: '1-800-987-6543',
    email: 'contact@airandspace.com',
    address: '1 Space Street Air City, Outer Space',
    causes: [6, 7],
    tags: [1, 2, 3, 4, 6, 12]
  }
];

const dummyEvents = [
  {
    id: 1,
    name: 'Member Appreciation Day',
    organization: 1,
    location: 'Reston YMCA Center',
    date: 'February 20, 2020 00:00:00',
    duration: '4 hours',
    description: 'Greet YMCA members as they enter the facility and offer them snacks.  See https://www.website.com for more details.',
    causes: [2, 3],
    tags: [2, 4, 12]
  },
  {
    id: 2,
    name: 'Triathlon Assistance',
    organization: 1,
    location: 'Reston YMCA Center',
    date: 'January 27, 2020 00:00:00',
    duration: '4 hours',
    description: 'Help YMCA staff host their annual indoor triathlon: sign in triathlon participants, direct the participants to the different stages of the triathlon, and record times. See https://www.triathlon.com for more details.',
    causes: [2, 3],
    tags: [2, 3, 9]
  },
  {
    id: 3,
    name: 'Adoption Day',
    organization: 2,
    location: 'Times Square, New York City, New York',
    date: 'December 13, 2020 00:00:00',
    duration: '8 hours',
    description: 'Help the ASPCA run their annual adoption day for their local pet shelter.',
    causes: [5],
    tags: [2, 3, 9, 12]
  },
  {
    id: 4,
    name: 'Docent Training Class',
    organization: 4,
    location: '14390 Air and Space Museum Pkwy Chantilly, VA 20151',
    date: 'January 30, 2021 00:00:00',
    duration: '2 hours',
    description: 'This is a required class for anyone who wants to be a docent (tour guide) at the National Air and Space Museum.',
    causes: [6, 7],
    tags: [2, 3, 13]
  }
];

const dummyTags = [
  {
    id: 1,
    name: 'virtual'
  },
  {
    id: 2,
    name: 'in-person'
  },
  {
    id: 3,
    name: 'weekends'
  },
  {
    id: 4,
    name: 'weekdays'
  },
  {
    id: 5,
    name: 'nights'
  },
  {
    id: 6,
    name: 'group'
  },
  {
    id: 7,
    name: 'delivery'
  },
  {
    id: 8,
    name: 'cooking'
  },
  {
    id: 9,
    name: 'administration'
  },
  {
    id: 10,
    name: 'cleaning'
  },
  {
    id: 11,
    name: 'heavy lifting'
  },
  {
    id: 12,
    name: 'greeting'
  },
  {
    id: 13,
    name: 'training'
  }
];

const dummyCauses = [
  {
    id: 1,
    name: 'Youth'
  },
  {
    id: 2,
    name: 'Community'
  },
  {
    id: 3,
    name: 'Health'
  },
  {
    id: 4,
    name: 'Disaster Response'
  },
  {
    id: 5,
    name: 'Animals'
  },
  {
    id: 6,
    name: 'Museums'
  },
  {
    id: 7,
    name: 'Education'
  },
  {
    id: 8,
    name: 'Human Rights'
  },
  {
    id: 9,
    name: 'Arts'
  }
];

export {
  dummyUsers,
  dummyOrgs,
  dummyEvents,
  dummyTags,
  dummyCauses
};