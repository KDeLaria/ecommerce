const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
  const data = await Category.findAll({include: [{model:Product}]});
  res.status(200).json(data);
}
catch (err) {
  console.log(err);
  return res.status(400).json({error: true});
}
  // be sure to include its associated Products
});

router.get('/:id',  async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {include: [{model:Product}]});
    return res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);

    return res.status(200).json({status:"Created new Category"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body,{where:{id:req.params.id}});

    return res.status(200).json({status:"Category updated"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({where:{id:req.params.id}});

    return res.status(200).json({status:"Category deleted"});
  }
  catch (err) {
    console.log(err);
    res.status(400).json({error: true});
  }
});

module.exports = router;
