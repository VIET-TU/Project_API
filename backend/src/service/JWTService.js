import db from "../models/index";

const getGroupWithRoles = async (user) => {
  // scope
  try {
    let roles = await db.Group.findOne({
      where: { id: user.groupId },
      attributes: ["id", "name", "description"],
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "decription"],
          through: { attributes: [] },
        },
      ],
    });
    return roles ? roles : {};
  } catch (error) {
    console.log(error);
  }
};

export { getGroupWithRoles };
