export function getRequestData (startDate, endDate) {
  return {
    'mapId': '3f18f9da-93d1-4319-95bd-702d24f48708',
    'from': startDate,
    'to': endDate,
    'areaDtos': [
      {
        'corner1': {
          'x': 0,
          'y': 149
        },
        'corner2': {
          'x': 203,
          'y': 300
        }
      },
      {
        'corner1': {
          'x': 203,
          'y': 149
        },
        'corner2': {
          'x': 393,
          'y': 300
        }
      },
      {
        'corner1': {
          'x': 393,
          'y': 190
        },
        'corner2': {
          'x': 600,
          'y': 300
        }
      },
      {
        'corner1': {
          'x': 506,
          'y': 0
        },
        'corner2': {
          'x': 600,
          'y': 191
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
    'dwellTime': ''
  },
  {
    points: [
      { 'x': 124, 'y': 186 },
      { 'x': 205, 'y': 160 },
      { 'x': 214, 'y': 193 },
      { 'x': 214, 'y': 291 },
      { 'x': 124, 'y': 291 }
    ],
    'dwellTime': ''
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
    'dwellTime': ''
  },
  {
    points: [
      { 'x': 536, 'y': 291 },
      { 'x': 630, 'y': 291 },
      { 'x': 630, 'y': 27 },
      { 'x': 536, 'y': 53 }
    ],
    'dwellTime': ''
  }
]
