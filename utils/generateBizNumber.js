import Card from "../models/Card.js";

const generateBizNumber = async () => {
  while (true) {
    const random = Math.floor(100000 + Math.random() * 900000); 
    const card = await Card.findOne({ bizNumber: random });
    if (!card) return random; 
  }
};

export default generateBizNumber;
