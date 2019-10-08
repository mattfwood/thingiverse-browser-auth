export default async (req, res) => {
  // console.log(Object.keys(req));
  console.log(req.url);
  // console.log(req.query)
  console.log(req.connection);

  return res.json({
    success: true,
  });
};
