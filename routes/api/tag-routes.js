const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({include: [{model:Product}]});
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({error: true});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {include: [{model:Product}]});
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({error: true});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);

    return res.status(200).json({status:"Created new Tag"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body,{where:{id:req.params.id}});

    return res.status(200).json({status:"Tag updated"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({where:{id:req.params.id}});

    return res.status(200).json({status:"Tag deleted"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

module.exports = router;
