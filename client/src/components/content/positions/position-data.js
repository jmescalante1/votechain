export const electionList = [
  'CAS', 'CAMP', 'CN'
]

export const electionData = {
  CAS: {
    status: 'finished',
    positions: [
      {
        name: 'President',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['JM', 'Alley', 'Jere']
      },
      {
        name: 'Vice President',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Rose', 'Timi', 'Waleed']
      },
      {
        name: 'Secretary',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Renee', 'Reena']
      },
      {
        name: 'Treasurer',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Alee', 'Mika']
      },
      {
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
        name: 'Chairman',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Vanessa', 'Deborah', 'Angelika']
      },
      {
        name: 'Vice Chairman',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Ice', 'Nice',]
      },
      {
        name: 'Public Relation',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Monica', 'Christian', 'Scarlet']
      },
      {
        name: 'Representatives',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Karen', 'Chloe']
      },
      {
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
        name: 'CEO',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Anthony', 'Antonio', 'Carl']
      },
      {
        name: 'Vice Executive Officer',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Cheska', 'Guen']
      },
      {
        name: 'Line Manager',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Mary Joy', 'Alliah']
      },
      {
        name: 'Scrum Master',
        maxNoOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Ally', 'Allyssa']
      },
      {
        name: 'Team Leaders',
        maxNoOfCandidatesToBeElected: 7,
        hasAbstain: true,
        candidates: ['Jake', 'Amy', 'Terry', 'Gina', 'Rosa', 'Boyle', 'Ray']
      },
    ]
  }
}
