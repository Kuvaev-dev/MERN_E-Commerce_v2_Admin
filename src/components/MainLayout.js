import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  FaShoppingCart,
  FaUser,
  FaClipboardList,
  FaBlog,
} from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { IoMdColorFill, IoIosNotifications } from "react-icons/io";
import { RiCoupon3Fill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Outlet, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">MZ</span>
            <span className="lg-logo">MERZOST`</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaUser className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <FaShoppingCart className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <FaShoppingCart className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaShoppingCart className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Add Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiSolidCategoryAlt className="fs-5" />,
                  label: "Add Category",
                },
                {
                  key: "list-category",
                  icon: <BiSolidCategoryAlt className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <IoMdColorFill className="fs-5" />,
                  label: "Add Color",
                },
                {
                  key: "list-color",
                  icon: <IoMdColorFill className="fs-5" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-5" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <SiMarketo className="fs-5" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <RiCoupon3Fill className="fs-5" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon3Fill className="fs-5" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBlog className="fs-5" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBlog className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-categories",
                  icon: <FaBlog className="fs-5" />,
                  label: "Blog Categories",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-5" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                1
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dbf03b98-b39c-4fc4-9dec-828963b6dfd0/deyu1xp-f0f85326-24a6-4fe3-bbc5-77be49647c5e.png/v1/fit/w_64,h_64,q_70,strp/skull_in_pixel_art_64x64_by_suchanames_deyu1xp-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvZGJmMDNiOTgtYjM5Yy00ZmM0LTlkZWMtODI4OTYzYjZkZmQwXC9kZXl1MXhwLWYwZjg1MzI2LTI0YTYtNGZlMy1iYmM1LTc3YmU0OTY0N2M1ZS5wbmciLCJ3aWR0aCI6Ijw9NjQwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JXcR28tfwdlzm97zB-eLyarVad_kXi7-RnX75rbWI3I"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Kuvaiev</h5>
                <p className="mb-0">kuvaiev@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Sign Out
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
