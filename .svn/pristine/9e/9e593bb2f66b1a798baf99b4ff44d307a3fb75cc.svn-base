"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Text, Image, Flex } from '@mantine/core';
// import { ResultModal } from "../../component";
import { IMAGES } from "@/utils/images";
import styles from "./FunctionList.module.css";
import { MenuItem } from "@/types/superAdmin/menuManagement/menuSetup/menuSetup";
import {
    IconGauge,
    IconKey,
    IconListDetails,
    IconLock,
    IconQuestionMark,
    IconReportAnalytics,
    IconSettings,
    IconUsers,
    IconUserShield,
} from "@tabler/icons-react";

const iconMap: any = {
    IconGauge: <IconGauge size={18} />,
    IconKey:<IconKey size={18} />,
    IconListDetails:<IconListDetails size={18} />,
    IconLock:<IconLock size={18} />,
    IconQuestionMark:<IconQuestionMark size={18} />,
    IconReportAnalytics:<IconReportAnalytics size={18} />,
    IconSettings:<IconSettings size={18} />,
    IconUsers:<IconUsers size={18} />,
    IconUserShield:<IconUserShield size={18} />,
};

type ParentCodeType = string;

interface FunctionListProps {
  allMenudetails: MenuItem[];
  isNavigate?: boolean;
}

const FunctionListTree: React.FC<FunctionListProps> = ({
  allMenudetails,
  isNavigate = true,
}) => {
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [hideSubMenus, setHideSubMenus] = useState<ParentCodeType[]>([]);
  const hendleSubMenuSet = (parentCode: ParentCodeType) => {
    // Check if parentCode exists in showSubMenus
    const parentIndex = hideSubMenus.indexOf(parentCode);

    if (parentIndex !== -1) {
      const updatedSubMenus = hideSubMenus.filter(
        (code) => code !== parentCode
      );
      setHideSubMenus(updatedSubMenus);
    } else {
      setHideSubMenus([...hideSubMenus, parentCode]);
    }
  };

  // Filter TopMenu and SideMenu items
  const topMenuItems =
    allMenudetails &&
    allMenudetails.filter((item) => item.MenuType === "TopMenu");
  const sideMenuItems =
    allMenudetails &&
    allMenudetails.filter((item) => item.MenuType === "SideMenu");

  const handleNavigation = (
    menuName: string,
    allowAccess: number,
    navigationLink: string
  ) => {
    if (allowAccess == 1) {
      router.push(navigationLink);
    } else {
      setAccessDenied(true);
    }
  };
  return (
    <>
      <div id={styles.tree}>
        <div className={styles.branch}>
          <div className={styles.entry}>
            <span className={styles.topNode}>Society management</span>
            <div className={styles.branch}>
              <div className={styles.entry}>
                  <div className={styles.branch}>
                    {sideMenuItems.length > 0 ? (
                      sideMenuItems.map((menus, index) => (
                        <div className={styles.entry} key={index}>
                          <span className={styles.menu}>
                            <Flex align="center" justify="space-between">
                              <div
                                onClick={() => {
                                  isNavigate
                                    ? handleNavigation(
                                      menus.menuDesc,
                                      menus.AllowAccess,
                                      menus.navigationLink
                                    )
                                    : "";
                                }}
                              >
                                <Text
                                  className={`ff-sans mb-0 ${styles.titleText}`}
                                >
                                  {/* <Image
                                  alt="no-img"
                                    mr={10}
                                    radius="md"
                                    h={20}
                                    w={20}
                                    fit="contain"
                                    src={
                                      menus.menuIcon != null
                                        ? IMAGES[
                                        (menus?.menuIcon.toUpperCase() +
                                          "_WHITE") as keyof typeof IMAGES
                                        ]
                                        : ""
                                    }
                                  /> */}

                                 {iconMap[menus.menuIcon]} {menus.menuDesc}
                                </Text>
                              </div>
                              {Array.isArray(menus.children) &&
                                menus.children.length > 0 && (
                                  <Image
                                    className={`ms-1 ${styles.collapseIcon}`}
                                    radius="md"
                                    h={15}
                                    w="auto"
                                    fit="contain"
                                    src={
                                      hideSubMenus.includes(menus.menuCode)
                                        ? IMAGES.DOUBLE_RIGHT_ARROW
                                        : IMAGES.DOUBLE_LEFT_ARROW
                                    }
                                    onClick={() => {
                                      hendleSubMenuSet(menus.menuCode);
                                    }}
                                  />
                                )}
                            </Flex>
                          </span>
                          {Array.isArray(menus.children) &&
                            menus.children.length > 0 &&
                            !hideSubMenus.includes(menus.menuCode) && (
                              <div className={styles.branch}>
                                {menus.children.map(
                                  (submenuItem: any, submenuIndex: number) => (
                                    <div
                                      className={styles.entry}
                                      key={submenuIndex}
                                    >
                                      <span
                                        className={styles.subMenu}
                                        onClick={() => {
                                          isNavigate
                                            ? handleNavigation(
                                              menus.menuDesc,
                                              menus.AllowAccess,
                                              submenuItem.navigationLink
                                            )
                                            : "";
                                        }}
                                      >
                                        <Text
                                          className={`ff-sans mb-0 ${styles.titleText}`}
                                          key={submenuIndex}
                                        >
                                          {/* <Image
                                           alt="no-img"
                                            mr={10}
                                            radius="md"
                                            h={20}
                                            w={20}
                                            fit="contain"
                                            src={
                                              submenuItem.menuIcon != null
                                                ? IMAGES[
                                                (submenuItem?.menuIcon.toUpperCase() +
                                                  "_WHITE") as keyof typeof IMAGES
                                                ]
                                                : ""
                                            }
                                          /> */}
                                          {iconMap[submenuItem.menuIcon]}{submenuItem.menuDesc}
                                        </Text>
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      ))
                    ) : (
                      <div className={`${styles.entry}`}>
                        <span className={styles.subMenu}>
                          <Text className={`ff-sans mb-0 ${styles.titleText}`}>
                            {/* <Image
                              alt="no-image"
                              src={
                                item.menuIcon != null &&
                                IMAGES[
                                  item?.menuIcon.toUpperCase() as keyof typeof IMAGES
                                ]
                              }
                              className="me-3"
                              height={20}
                            /> */}
                            No Side Menu
                          </Text>
                        </span>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ResultModal
        isopen={accessDenied}
        handleOk={() => {
          setAccessDenied(false);
        }}
        handleClose={() => {
          setAccessDenied(false);
        }}
        alerticon={IMAGES.WARNING_ICON}
        alertMessage="Alert!"
        alertSubtext="You don't have access to this menu. Please contact the admin."
        actionBtnTxt="OK"
        isCancelButton={false}
      /> */}
    </>
  );
};

export default FunctionListTree;
