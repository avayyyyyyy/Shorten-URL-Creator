import { nanoid } from "nanoid";
import { URLModels } from "../Models/urlModel.js";

export const GenerateID = async (req, res) => {
  let { URL } = req.body;

  if (!URL) {
    res.status(400).json({ success: false, message: "Empty Input Sent" });
  }

  if (URL.startsWith("https://")) {
    URL = URL.slice(8);
  } else if (URL.startsWith("http://")) {
    URL = URL.slice(7);
  } else if (URL.startsWith("www.")) {
    URL = URL.slice(4);
  }
  try {
    const isAlready = await URLModels.findOne({ URL });
    if (isAlready != null) {
      const Update = await URLModels.findOneAndUpdate(
        { URL },
        {
          totalCicks: isAlready.totalCicks + 1,
        }
      );
      res.status(200).json({ success: true, message: await isAlready.shortID });
    } else {
      const ShortID = nanoid(6);
      const Inserted = await URLModels.create({
        URL,
        shortID: ShortID,
      });
      res.status(200).json({ success: true, message: Inserted.shortID });

      await Inserted.save();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const GetUrl = async (req, res) => {
  const id = req.params.id;
  try {
    const isAlready = await URLModels.findOne({ shortID: id });
    if (isAlready != null) {
      const Orignial = await isAlready.URL;
      res.redirect(`https://${Orignial}`);
    } else {
      res.status(404).send("Invaid URL");
    }
  } catch (error) {
    console.log(error.message);
  }
};
