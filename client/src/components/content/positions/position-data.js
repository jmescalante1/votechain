export const electionList = [
  'CAS', 'CAMP', 'CN'
]

export const electionData = {
  CAS: {
    status: 'finished',
    positions: [
      {
        name: 'President',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['JM', 'Alley', 'Jere']
      },
      {
        name: 'Vice President',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Rose', 'Timi', 'Waleed']
      },
      {
        name: 'Secretary',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Renee', 'Reena']
      },
      {
        name: 'Treasurer',
        noOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Alee', 'Mika']
      },
      {
        name: 'Councilors',
        noOfCandidatesToBeElected: 7,
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
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Vanessa', 'Deborah', 'Angelika']
      },
      {
        name: 'Vice Chairman',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Ice', 'Nice',]
      },
      {
        name: 'Public Relation',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Monica', 'Christian', 'Scarlet']
      },
      {
        name: 'Representatives',
        noOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Karen', 'Chloe']
      },
      {
        name: 'Councilors',
        noOfCandidatesToBeElected: 7,
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
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Anthony', 'Antonio', 'Carl']
      },
      {
        name: 'Vice Executive Officer',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Angel', 'Cheska', 'Guen']
      },
      {
        name: 'Line Manager',
        noOfCandidatesToBeElected: 1,
        hasAbstain: true,
        candidates: ['Mary Joy', 'Alliah']
      },
      {
        name: 'Scrum Master',
        noOfCandidatesToBeElected: 1,
        hasAbstain: false,
        candidates: ['Ally', 'Allyssa']
      },
      {
        name: 'Team Leaders',
        noOfCandidatesToBeElected: 7,
        hasAbstain: true,
        candidates: ['Jake', 'Amy', 'Terry', 'Gina', 'Rosa', 'Boyle', 'Ray']
      },
    ]
  }
}
