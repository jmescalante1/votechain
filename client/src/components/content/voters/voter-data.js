let studentNo = 201500000

function generateStudentNo() {
  return ++studentNo
}

export const electionList = [
  'CAS', 'CAMP', 'CN'
]
export const electionData =  {
  CAS: {
    status: 'finished',
    voters: [
      {
        id: 1,
        name: 'JM',
        studentNo: generateStudentNo(),
      },
      {
        id: 2,
        name: 'Alley',
        studentNo: generateStudentNo(),
      },
      {
        id: 3,
        name: 'Jere',
        studentNo: generateStudentNo(),
      },
      {
        id: 4,
        name: 'Rose',
        studentNo: generateStudentNo(),
      },
      {
        id: 5,
        name: 'Timi',
        studentNo: generateStudentNo(),
      },
      {
        id: 6,
        name: 'Waleed',
        studentNo: generateStudentNo(),
      },
      {
        id: 7,
        name: 'Angel',
        studentNo: generateStudentNo(),
      },
      {
        id: 8,
        name: 'Renee',
        studentNo: generateStudentNo(),
      },
      {
        id: 9,
        name: 'Reena',
        studentNo: generateStudentNo(),
      },
      {
        id: 10,
        name: 'Alee',
        studentNo: generateStudentNo(),
      },
      {
        id: 11,
        name: 'Mika',
        studentNo: generateStudentNo(),
      },
      {
        id: 12,
        name: 'David',
        studentNo: generateStudentNo(),
      },
    ]
  },

  CAMP: {
    status: 'ongoing',
    voters: [
      {
        id: 13,
        name: 'Vanessa',
        studentNo: generateStudentNo(),
      },
      {
        id: 14,
        name: 'Deborah',
        studentNo: generateStudentNo(),
      },
      {
        id: 15,
        name: 'Angelika',
        studentNo: generateStudentNo(),
      },
      {
        id: 16,
        name: 'Ice',
        studentNo: generateStudentNo(),
      },
      {
        id: 17,
        name: 'Nice',
        studentNo: generateStudentNo(),
      },
      {
        id: 18,
        name: 'Monica',
        studentNo: generateStudentNo(),
      },
      {
        id: 19,
        name: 'Christian',
        studentNo: generateStudentNo(),
      },
      {
        id: 20,
        name: 'Scarlet',
        studentNo: generateStudentNo(),
      },
      {
        id: 21,
        name: 'Karen',
        studentNo: generateStudentNo(),
      },
      {
        id: 22,
        name: 'Chloe',
        studentNo: generateStudentNo(),
      },
      {
        id: 23,
        name: 'Charles',
        studentNo: generateStudentNo(),
      },
      {
        id: 24,
        name: 'Reuben',
        studentNo: generateStudentNo(),
      },  
    ]
  },
  CN: {
    status: 'pending',
    voters: [
      {
        id: 25,
        name: 'Anthony',
        studentNo: generateStudentNo(),
      },
      {
        id: 26,
        name: 'Antonio',
        studentNo: generateStudentNo(),
      },
      {
        id: 27,
        name: 'Carl',
        studentNo: generateStudentNo(),
      },
      {
        id: 28,
        name: 'Angel',
        studentNo: generateStudentNo(),
      },
      {
        id: 29,
        name: 'Cheska',
        studentNo: generateStudentNo(),
      },
      {
        id: 30,
        name: 'Guen',
        studentNo: generateStudentNo(),
      },
      {
        id: 31,
        name: 'Mary Joy',
        studentNo: generateStudentNo(),
      },
      {
        id: 32,
        name: 'Alliah',
        studentNo: generateStudentNo(),
      },
      {
        id: 33,
        name: 'Ally',
        studentNo: generateStudentNo(),
      },
      {
        id: 34,
        name: 'Allyssa',
        studentNo: generateStudentNo(),
      },
      {
        id: 35,
        name: 'Jake',
        studentNo: generateStudentNo(),
      },
      {
        id: 36,
        name: 'Amy',
        studentNo: generateStudentNo(),
      },  
    ]
  },
}