import joi from "joi";
import generalFields from "../../utils/generalFields.js";
const egyptianCities = [
  { id: "cairo", label: "Cairo" },
  { id: "alexandria", label: "Alexandria" },
  { id: "giza", label: "Giza" },
  { id: "shubraElkheima", label: "Shubra El-Kheima" },
  { id: "portSaid", label: "Port Said" },
  { id: "suez", label: "Suez" },
  { id: "luxor", label: "Luxor" },
  { id: "mansoura", label: "Mansoura" },
  { id: "elMahallaElKubra", label: "El-Mahalla El-Kubra" },
  { id: "tanta", label: "Tanta" },
  { id: "asyut", label: "Asyut" },
  { id: "ismailia", label: "Ismailia" },
  { id: "fayyum", label: "Fayyum" },
  { id: "zagazig", label: "Zagazig" },
  { id: "aswan", label: "Aswan" },
  { id: "damietta", label: "Damietta" },
  { id: "beniSuef", label: "Beni Suef" },
  { id: "qena", label: "Qena" },
  { id: "sohag", label: "Sohag" },
  { id: "hurghada", label: "Hurghada" },
  { id: "6thOfOctoberCity", label: "6th of October City" },
  { id: "shibinElKom", label: "Shibin El Kom" },
  { id: "banha", label: "Banha" },
  { id: "10thOfRamadanCity", label: "10th of Ramadan City" },
  { id: "idfu", label: "Idfu" },
  { id: "mitGhamr", label: "Mit Ghamr" },
  { id: "AlHamidiyya", label: "Al-Hamidiyya" },
  { id: "qalyub", label: "Qalyub" },
  { id: "abuKabir", label: "Abu Kabir" },
  { id: "girga", label: "Girga" },
  { id: "baniMazar", label: "Bani Mazar" },
  { id: "newCairo", label: "New Cairo" },
  { id: "siwa", label: "Siwa" },
  { id: "eltor", label: "El Tor" },
  { id: "dahab", label: "Dahab" },
  { id: "rasGharib", label: "Ras Gharib" },
  { id: "qus", label: "Qus" },
  { id: "abnub", label: "Abnub" },
  { id: "badr", label: "Badr" },
  { id: "samalut", label: "Samalut" },
  { id: "ashmun", label: "Ashmun" },
  { id: "aja", label: "Aja" },
  { id: "ibsheway", label: "Ibsheway" },
  { id: "tamiya", label: "Tamiya" },
  { id: "dikirnis", label: "Dikirnis" },
  { id: "manzalah", label: "Manzalah" },
  { id: "alQanatirAlKhayriyyah", label: "Al-Qanatir Al-Khayriyyah" },
  { id: "minuf", label: "Minuf" },
  { id: "kafrAlZayyat", label: "Kafr Al-Zayyat" },
  { id: "dayrut", label: "Dayrut" },
  { id: "kafrAlDawwar", label: "Kafr al-Dawwar" },
  { id: "akhmim", label: "Akhmim" },
  { id: "sidiBarrani", label: "Sidi Barrani" },
  { id: "alQusayr", label: "Al Qusayr" },
  { id: "safaga", label: "Safaga" },
  { id: "marsaAlam", label: "Marsa Alam" },
  { id: "nagHammadi", label: "Nag Hammadi" },
  { id: "alFashn", label: "Al Fashn" },
  { id: "tala", label: "Tala" },
  { id: "matruh", label: "Matruh" },
  { id: "baltim", label: "Baltim" },
  { id: "alManzilah", label: "Al Manzilah" },
  { id: "abuHammad", label: "Abu Hammad" },
  { id: "sidiSalim", label: "Sidi Salim" },
  { id: "alAlamayn", label: "Al Alamayn" },
  { id: "alHawamidiyah", label: "Al Hawamidiyah" },
  { id: "abuTij", label: "Abu Tij" },
  { id: "alayyat", label: "Al Ayyat" },
  { id: "talAlKebir", label: "Tal al Kebir" },
  { id: "ainSukhna", label: "Ain Sukhna" },
  { id: "rafah", label: "Rafah" },
  { id: "desouk", label: "Desouk" },
  { id: "mallawi", label: "Mallawi" },
  { id: "samannud", label: "Samannud" },
  { id: "sharmElSheikh", label: "Sharm El-Sheikh" },
  { id: "arish", label: "Arish" },
  { id: "damanhur", label: "Damanhur" },
  { id: "kafrElSheikh", label: "Kafr el-Sheikh" },
  { id: "faraskur", label: "Faraskur" },
  { id: "minya", label: "Minya" },
  { id: "bilbays", label: "Bilbays" },
  { id: "ashmun", label: "Ashmun" },
  { id: "faiyum", label: "Faiyum" },
  { id: "dairut", label: "Dairut" },
  { id: "edfu", label: "Edfu" },
];
export const addPropertySchema = joi
  .object({
    name: joi
      .string()
      .min(3)
      .max(30)
      .messages({
        "string.empty": "name can't be empty",
        "string.min": "name can't be less than 3 char",
        "string.max": "name can't be greater than 30 char",
        "any.required": "name is required field",
      })
      .required(),
    description: joi.string().min(3).max(30).messages({
      "string.empty": "Description can't be empty",
      "string.min": "Description can't be less than 3 char",
      "string.max": "Description can't be greater than 30 char",
      "any.required": "Description is required field",
    }),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file).required(),
      coverImages: joi.array().items(generalFields.file),
    }),
    city: joi
      .string()
      .messages({
        "string.empty": "city Location can't be empty",
        "any.required": "city Location is required field",
      })
      .required(),
    city: joi
      .string()
      .messages({
        "string.empty": "city Location can't be empty",
        "any.required": "city Location is required field",
      })
      .required(),
    area: joi
      .string()
      .valid(
        "newCapitalCity",
        "mustaqbalCity",
        "ainSokhna",
        "elGouna",
        "newHeliopolis"
      )
      .messages({
        "string.empty": "area Location can't be empty",
        "any.required": "area Location is required field",
      })
      .required(),
    price: joi.number().positive(),
    purpose: joi.string().valid("buy", "rent"),
    use: joi
      .string()
      .valid("commercial", "residential", "apartment", "duplexes", "villa"),
    currency: joi.string().valid("USD", "EGP", "SAR", "EUR", "AED"),
    bedrooms: joi.number(),
    bathrooms: joi.number(),
    priceRange: joi.string(),
  })
  .required();
export const updatePropertySchema = joi
  .object({
    id: generalFields.id,
    name: joi.string().min(3).max(30).messages({
      "string.empty": "name can't be empty",
      "string.min": "name can't be less than 3 char",
      "string.max": "name can't be greater than 30 char",
      "any.required": "name is required field",
    }),
    description: joi.string().min(3).max(30).messages({
      "string.empty": "Description can't be empty",
      "string.min": "Description can't be less than 3 char",
      "string.max": "Description can't be greater than 30 char",
      "any.required": "Description is required field",
    }),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file),
      coverImages: joi.array().items(generalFields.file),
    }),
    city: joi.string().messages({
      "string.empty": "city can't be empty",
      "any.required": "city is required field",
    }),
    area: joi
      .string()
      .valid(
        "newCapitalCity",
        "mustaqbalCity",
        "ainSokhna",
        "elGouna",
        "newHeliopolis"
      )
      .messages({
        "string.empty": "area Location can't be empty",
        "any.required": "area Location is required field",
      }),
    price: joi.number().positive(),
    purpose: joi.string().valid("buy", "rent"),
    use: joi
      .string()
      .valid("commercial", "residential", "apartment", "duplexes", "villa"),
    currency: joi.string().valid("USD", "EGP", "SAR", "EUR", "AED"),
    bedrooms: joi.number(),
    bathrooms: joi.number(),
    priceRange: joi.string(),
  })
  .required();
export const deletePropertySchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
export const getPropertyByIdSchema = joi
  .object({
    id: generalFields.id,
  })
  .required();
