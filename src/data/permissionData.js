const permissionsData = [
  {
    Name: "Dashboard Data Permission",
    Type: [{ type_name: "Dashboard Show", type_value: "dashboard_show" }],
  },
  {
    Name: "Category Data Permission",
    Type: [
      { type_name: "Category Show", type_value: "category_show" },
      { type_name: "Category Create", type_value: "category_post" },
      { type_name: "Category Update", type_value: "category_update" },
      { type_name: "Category Delete", type_value: "category_delete" },
    ],
  },
  {
    Name: "Banner Data Permission",
    Type: [
      { type_name: "Banner Show", type_value: "banner_show" },
      { type_name: "Banner Create", type_value: "banner_create" },
      { type_name: "Banner Update", type_value: "banner_update" },
      { type_name: "Banner Delete", type_value: "banner_delete" },
    ],
  },
  {
    Name: "Zone Data Permission",
    Type: [
      { type_name: "Zone Show", type_value: "zone_show" },
      { type_name: "Zone Create", type_value: "zone_create" },
      { type_name: "Zone Update", type_value: "zone_update" },
      { type_name: "Zone Delete", type_value: "zone_delete" },
    ],
  },
  {
    Name: "Product Data Permission",
    Type: [
      { type_name: "Product Show", type_value: "product_show" },
      { type_name: "Product Create", type_value: "product_create" },
      { type_name: "Product Update", type_value: "product_update" },
      { type_name: "Product Delete", type_value: "product_delete" },
    ],
  },
  {
    Name: "Customer Data Permission",
    Type: [
      { type_name: "Customer Show", type_value: "user_show" },
      { type_name: "Customer Update", type_value: "user_update" },
    ],
  },
  {
    Name: "Admin Data Permission",
    Type: [
      { type_name: "Admin Show", type_value: "admin_show" },
      { type_name: "Admin Create", type_value: "admin_create" },
      { type_name: "Admin Update", type_value: "admin_update" },
      { type_name: "Admin Delete", type_value: "admin_delete" },
    ],
  },
  {
    Name: "Role Data Permission",
    Type: [
      { type_name: "Role Show", type_value: "role_show" },
      { type_name: "Role Create", type_value: "role_create" },
      { type_name: "Role Update", type_value: "role_update" },
      { type_name: "Role Delete", type_value: "role_delete" },
    ],
  },
  {
    Name: "Site Setting Update",
    Type: [
      { type_name: "Update Site Setting", type_value: "site_setting_update" },
    ],
  },
  {
    Name: "Order Show And Update",
    Type: [
      { type_name: "Order Show", type_value: "order_show" },
      { type_name: "Order Update", type_value: "order_update" },
      { type_name: "Staff Order Show", type_value: "assign_staff_order_show" },
    ],
  },
];

export default permissionsData;
