Cả hai phương thức router.all() và router.use() đều được sử dụng để đăng ký middleware handler (trung gian xử lý) trong Express.js. Tuy nhiên, có một số điểm khác nhau giữa chúng:

router.use() có thể được sử dụng để đăng ký middleware handler cho một đường dẫn cụ thể hoặc một nhóm các đường dẫn, trong khi router.all() đăng ký middleware handler cho tất cả các phương thức HTTP trên một đường dẫn cụ thể.

router.use() có thể được sử dụng để đăng ký một chuỗi các middleware handlers, trong khi router.all() chỉ đăng ký một middleware handler duy nhất.

Về mặt thứ tự xử lý, middleware handlers được đăng ký bằng router.use() sẽ được xử lý trước các middleware handlers được đăng ký bằng router.all() trên cùng một đường dẫn.

Vì vậy, khi bạn cần đăng ký một middleware handler cho một nhóm các đường dẫn hoặc đăng ký một chuỗi các middleware handlers, bạn nên sử dụng router.use(). Còn nếu bạn chỉ cần đăng ký một middleware handler duy nhất cho tất cả các phương thức HTTP trên một đường dẫn cụ thể, bạn có thể sử dụng router.all().

---

Group.belongsToMany(models.Role, {
through: "Group_Role",
foreignKey: "groupId",
});
Role.belongsToMany(models.Group, {
through: "Group_Role",
foreignKey: "roleId",
});

định nghĩa foreignKey để sequelize không tự động generate foreignKey nx
"INSERT INTO `Group_Role` (`groupId`,`roleId`,`createdAt`,`updatedAt`,`GroupId`,`RoleId`) VALUES (...);",
=>>>>"INSERT INTO `Group_Role` (`groupId`,`roleId`,`createdAt`,`updatedAt`,) VALUES (...);",
