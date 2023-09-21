import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default async (req, res) => {
  try {
    upload.single('picture')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Upload failed' });
      }

      // File was successfully uploaded
      // You can perform any additional logic here
      res.status(200).json({ message: 'Upload successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
