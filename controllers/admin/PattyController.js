const { patty } = require("../../models");

class PattyController {
  static async getPatties(req, res) {
    try {
      let patties = await patty.findAll();
      res.status(200).json(patties);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const { userId, balance } = req.body;
      const id = req.params.id;
      const result = await patty.update({ balance }, { where: { id, userId } });
      result[0] === 1 ? res.status(200).json({ msg: `updated` }) : res.status(404).json({ msg: `not found` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = PattyController;
