export function getRequestData (startDate, endDate) {
  return {
    'mapId': '3f18f9da-93d1-4319-95bd-702d24f48708',
    'from': startDate,
    'to': endDate,
    'areaDtos': [
      {
        'corner1': {
          'x': 0,
          'y': 2550
        },
        'corner2': {
          'x': 1960,
          'y': 4230
        }
      },
      {
        'corner1': {
          'x': 1960,
          'y': 2120
        },
        'corner2': {
          'x': 3420,
          'y': 4230
        }
      },
      {
        'corner1': {
          'x': 3420,
          'y': 2120
        },
        'corner2': {
          'x': 6760,
          'y': 4230
        }
      }
    ]
  }
}
export const areas = [
  {
    points: [
      { 'x': 0, 'y': 228 },
      { 'x': 124, 'y': 186 },
      { 'x': 124, 'y': 291 },
      { 'x': 0, 'y': 291 }
    ],
    'dwellTime': '',
    'customerCount': ''
  },
  {
    points: [
      { 'x': 124, 'y': 186 },
      { 'x': 205, 'y': 160 },
      { 'x': 214, 'y': 193 },
      { 'x': 214, 'y': 291 },
      { 'x': 124, 'y': 291 }
    ],
    'dwellTime': '',
    'customerCount': ''
  },
  {
    points: [
      { 'x': 214, 'y': 192 },
      { 'x': 292, 'y': 166 },
      { 'x': 298, 'y': 183 },
      { 'x': 298, 'y': 194 },
      { 'x': 536, 'y': 194 },
      { 'x': 536, 'y': 291 },
      { 'x': 214, 'y': 291 }
    ],
    'dwellTime': '',
    'customerCount': ''
  }
  // {
  //   points: [
  //     { 'x': 536, 'y': 291 },
  //     { 'x': 630, 'y': 291 },
  //     { 'x': 630, 'y': 27 },
  //     { 'x': 536, 'y': 53 }
  //   ],
  //   'dwellTime': '',
  //   'customerCount': ''
  // }
]
