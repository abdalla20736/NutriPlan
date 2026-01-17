const novaStyle = {
  1: {
    label: "Unprocessed",
    color: "#038141",
  },
  2: {
    label: "Processed Ingredients",
    color: "#85bb2f",
  },
  3: {
    label: "Processed",
    color: "#ee8100",
  },
  4: {
    label: "Ultra-processed",
    color: "#e63e11",
  },
};

const gradeStyle = {
  a: {
    label: "Excellent",
    color: "#038141",
  },
  b: {
    label: "Good",
    color: "#85bb2f",
  },
  c: {
    label: "Average",
    color: "#fecb02",
  },
  d: {
    label: "Poor",
    color: "#ee8100",
  },
  e: {
    label: "Bad",
    color: "#e63e11",
  },
  unknown: {
    label: "Unknown",
    color: "#999999",
  },
  "not-applicable": {
    label: "Not Applicable",
    color: "#999999",
  },
};

const staticData = {
  novaStyle,
  gradeStyle,
};

export default staticData;
