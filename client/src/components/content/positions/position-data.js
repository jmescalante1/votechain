export const electionList = [
  'CAS', 'CAMP', 'CN'
]

export const electionData = {
  CAS: {
    status: 'finished',
    positions: [
      {
        id: 1,
        name: 'President',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['JM', 'Alley', 'Jere']
      },
      {
        id: 2,
        name: 'Vice President',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Rose', 'Timi', 'Waleed']
      },
      {
        id: 3,
        name: 'Secretary',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Renee', 'Reena']
      },
      {
        id: 4,
        name: 'Treasurer',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Alee', 'Mika']
      },
      {
        id: 5,
        name: 'Councilors',
        maxNoOfCandidatesToBeElected: 7,
        hasAbstain: true,
        candidates: ['David', 'Ben', 'Ten', 'Myka', 'Jaz', 'Jasper', 'Christine']
      },
    ]
  },
  CAMP: {
    status: 'ongoing',
    positions: [
      {
        id: 1,
        name: 'Chairman',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Vanessa', 'Deborah', 'Angelika']
      },
      {
        id: 2,
        name: 'Vice Chairman',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Ice', 'Nice',]
      },
      {
        id: 3,
        name: 'Public Relation',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Monica', 'Christian', 'Scarlet']
      },
      {
        id: 4,
        name: 'Representatives',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Karen', 'Chloe']
      },
      {
        id: 5,
        name: 'Councilors',
        maxNoOfCandidatesToBeElected: 7,
        hasAbstain: true,
        candidates: ['Charles', 'Reuben', 'Dean', 'Alice', 'Bob', 'Mike', 'Melody']
      },
    ]
  },
  CN: {
    status: 'pending',
    positions: [
      {
        id: 1,
        name: 'CEO',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Anthony', 'Antonio', 'Carl']
      },
      {
        id: 2,
        name: 'Vice Executive Officer',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Cheska', 'Guen']
      },
      {
        id: 3,
        name: 'Line Manager',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Mary Joy', 'Alliah']
      },
      {
        id: 4,
        name: 'Scrum Master',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Ally', 'Allyssa']
      },
      {
        id: 5,
        name: 'Team Leaders',
        maxNoOfCandidatesToBeElected: 7,
        hasAbstain: true,
        candidates: ['Jake', 'Amy', 'Terry', 'Gina', 'Rosa', 'Boyle', 'Ray']
      },
    ]
  }
}
