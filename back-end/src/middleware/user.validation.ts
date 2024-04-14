import { check, body, validationResult } from "express-validator";
class UserValidation {
  checkUser() {
    return [
      check("id")
        .trim()
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("Id must be number.")
        .bail(),

      check("user_id")
        .exists()
        .withMessage("user_id id must must be required")
        .bail()
        .notEmpty()
        .withMessage("user_id is not empty")
        .bail(),

      check("login_user_id")
        .exists()
        .withMessage("login_user_id id must must be required")
        .bail()
        .notEmpty()
        .withMessage("login_user_id is not empty")
        .bail()
        .isString()
        .withMessage("login_user_id field must be string.")
        .bail(),
    ];
  }
  login() {
    return [
      check("userName")
      .exists()
      .withMessage("user_id id must must be required")
      .bail()
      .notEmpty()
      .withMessage("user_id is not empty")
      .bail(),
        check("password")
        .exists()
        .withMessage("user_id id must must be required")
        .bail()
        .notEmpty()
        .withMessage("user_id is not empty")
        .bail(),
    ];
  }
  OTPVerify() {
    return [
      check("userName")
      .trim()
      .notEmpty()
      .withMessage("firstName field couldn't be empty.")
      .bail()
      .exists()
      .withMessage("firstName name is required")
      .bail()
      .isLength({ min: 2, max: 40 })
      .withMessage(
        "firstName field can be min 2 and max 40 charcaters in length"
      )
      .bail()
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Special characters in firstName not allowed")
      .bail(),

      check("Password")
      .trim()
      .notEmpty()
      .withMessage("firstName field couldn't be empty.")
      .bail()
      .exists()
      .withMessage("firstName name is required")
      .bail()
      .isLength({ min: 2, max: 40 })
      .withMessage(
        "firstName field can be min 2 and max 40 charcaters in length"
      )
      .bail()
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Special characters in firstName not allowed")
      .bail(),
    ];
  }
  create() {
    return [
      check("firstName")
        .trim()
        .notEmpty()
        .withMessage("firstName field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("firstName name is required")
        .bail()
        .isLength({ min: 2, max: 40 })
        .withMessage(
          "firstName field can be min 2 and max 40 charcaters in length"
        )
        .bail()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage("Special characters in firstName not allowed")
        .bail(),

      check("lastName")
        .trim()
        .notEmpty()
        .withMessage("lastName field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("lastName name is required")
        .bail()
        .isLength({ min: 2, max: 40 })
        .withMessage(
          "lastName field can be min 2 and max 40 charcaters in length"
        )
        .bail()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage("Special characters in lastName not allowed")
        .bail(),

      check("password")
        .trim()
        .notEmpty()
        .withMessage("password field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("password name is required")
        .bail()
        .isLength({ min: 2, max: 40 })
        .withMessage(
          "password field can be min 2 and max 40 charcaters in length"
        )
        .bail(),
        check("userName")
        .trim()
        .notEmpty()
        .withMessage("userName field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("userName name is required")
        .bail()
        .isLength({ min: 2, max: 40 })
        .withMessage(
          "userName field can be min 2 and max 40 charcaters in length"
        )
        .bail()
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage("Special characters in userName not allowed")
        .bail(),

      check("email")
        .trim()
        .notEmpty()
        .withMessage("email field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("email field is required.")
        .bail()
        .isEmail()
        .withMessage("email field should be in email format.")
        .bail()
        .isLength({ min: 3, max: 200 })
        .withMessage(
          "fname field can be min 2 and max 200 characters in length"
        )
        .bail()
    ];
  }

}
export const userValidation = new UserValidation();
