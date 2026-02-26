"use client";

import { useEffect, useState } from "react";
import { SimpleGrid, Card, Text, Group, Loader, Center, Stack } from "@mantine/core";
import { IconPlus, IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { getRequest, deleteRequest, postRequest, putRequest } from "@/service";
import { MenuTree } from "@/components/MenuTree";
import { API_PATH } from "@/utils/apiPath";
import {
  EntitiyCard,
  DrawerForm,
  AppBreadcrumbs,
  CustomModal,
} from "@/components";
import { COMMON_MESSAGE } from "@/utils/constants";
import {useMenuPermissions } from '@/hooks/useMenuPermissions'


interface MenuItem {
  id: string;
  menuCode: number;
  menuName: string;
  menuDesc: string;
  parentMenu: number;
  menuLevel: number;
  menuSeq: number;
  menuUrl: string;
  status: number;
  menuIcon?: string | null;
  children?: MenuItem[];
}

const MenuSetup = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [menuTreeData, setMenuTreeData] = useState<any[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState<Partial<MenuItem> | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [treeModalOpen, setTreeModalOpen] = useState(false);
  const [selectedMenuForTree, setSelectedMenuForTree] = useState<any>(null);

  const [showArchived, setShowArchived] = useState(false);
  const { canWrite, canDelete } = useMenuPermissions();

  /* ---------------- Notifications ---------------- */

  const notifySuccess = (msg: string) =>
    notifications.show({
      title: "Success",
      message: msg,
      color: "green",
      icon: <IconCheck size={16} />,
    });

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

    // ========== Filter out active children from menu tree ============

  const filterActiveChildren = (node: any): any => {
    return {
      ...node,
      children: Array.isArray(node.children)
        ? node.children
          .filter((child: any) => child.status === 1)
          .map(filterActiveChildren)
        : [],
    };
  };

const flattenMenus = (menuList: any[]): any[] => {
  return menuList.reduce((acc, menu) => {
    acc.push(menu);
    if (menu.children && menu.children.length > 0) {
      acc.push(...flattenMenus(menu.children));
    }
    return acc;
  }, []);
};


  /* ---------------- API ---------------- */

  // const fetchMenus = async () => {
  //   try {
  //     const res = await getRequest(
  //       `${API_PATH.MENU_MASTER}`
  //     );
  //     console.log(res, 'MENU SETUP RES')
  //     setMenus((res as any)?.data?.data ?? []);
  //   } catch {
  //     notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMenus = async () => {
    try {
      const res = await getRequest(`${API_PATH.MENU_MASTER}`);
      const rawMenus = (res as any)?.data?.data ?? [];
      setMenus(flattenMenus(rawMenus));
    } catch {
      notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuTree = async (id: string) => {
    try {
      setTreeLoading(true);

      const res = await getRequest(
        `${API_PATH.MENU_MASTER}/${id}`
      );

      const menuData = (res as any)?.data;

      if (!menuData) {
        notifyError("Menu tree data not found");
        return;
      }

      const sanitizedTree = filterActiveChildren(menuData);

      setMenuTreeData([sanitizedTree]);
      setSelectedMenuForTree(sanitizedTree);
      setTreeModalOpen(true);
    } catch (err) {
      console.error("Menu tree fetch failed:", err);
      notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
    } finally {
      setTreeLoading(false);
    }
  };


  useEffect(() => {
    fetchMenus();
    
  }, []);

  /* ---------------- Add / Edit ---------------- */

  const handleSubmitMenu = async (values: Record<string, any>) => {

    if (!canWrite) {
      notifyError(COMMON_MESSAGE.NO_MENU_UPDATE_PERMISSION);
      return;
    }
    try {
      const payload = {
        menuCode: Number(values.menuCode),
        menuName: values.menuName,
        menuDesc: values.menuDesc,
        parentMenu: Number(values.parentMenu || values.menuCode),
        menuLevel: Number(values.menuLevel),
        menuSeq: Number(values.menuSeq),
        menuUrl: values.menuUrl,
        menuIcon: values.menuIcon || selectedMenu?.menuIcon,
        status: Number(values.status),
      };

      if (drawerMode === "add") {
        await postRequest(API_PATH.MENU_MASTER, payload);
        notifySuccess(COMMON_MESSAGE.MENU_ADDED);
      } else {
        await putRequest(
          `${API_PATH.MENU_MASTER}/${selectedMenu?.id}`,
          payload
        );
        notifySuccess(COMMON_MESSAGE.MENU_UPDATED);
      }

      setDrawerOpen(false);  
      setSelectedMenu(null);
      fetchMenus();
    } catch {
      notifyError(
        drawerMode === "add"
          ? COMMON_MESSAGE.MENU_ADD_FAIL
          : COMMON_MESSAGE.MENU_UPDATE_FAIL
      );
    }
  };

  /* ---------------- Delete ---------------- */

  const confirmDelete = async (id: string) => {
    if (!selectedMenu) return;

    if (!canWrite) {
      notifyError(COMMON_MESSAGE.NO_MENU_DELETE_PERMISSION);
      setDeleteModalOpen(false);
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteRequest(`${API_PATH.MENU_MASTER}/${id}`);
      notifySuccess(COMMON_MESSAGE.DELETE_SUCCESS);
      setDeleteModalOpen(false);
      setSelectedMenu(null);
      fetchMenus();
    } catch {
      notifyError(COMMON_MESSAGE.DELETE_FAIL);
    } finally {
      setDeleteLoading(false);
    }
  };


  const hasChildren = (menu: MenuItem): boolean => {
    return (
      Array.isArray(menu.children) &&
      menu.children.filter(child => child.status === 1).length > 0
    );
  };

  /* ---------------- Fields ---------------- */

  const menuFields = [
    { name: "menuCode", label: "Menu Code", required: true },
    { name: "menuName", label: "Menu Name", required: true },
    { name: "menuDesc", label: "Menu Description", required: true },
    {
      name: "parentMenu",
      label: "Parent Menu",
      type: "select" as const,
      options: menus
        .filter((m) => m.status === 1)
        .map((m) => ({
          value: String(m.menuCode),
          label: m.menuName,
        })),
    },
    { name: "menuLevel", label: "Menu Level", type: "number" as const },
    { name: "menuSeq", label: "Menu Sequence", type: "number" as const },
    { name: "menuUrl", label: "Menu URL", required: true },
    {
      name: "menuIcon",
      label: "Menu Icon",
      type: "file" as const,
      fileType: "svg" as const,
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "1", label: "Active" },
        { value: "0", label: "Inactive" },
      ],
    },
  ];

  const editInitialValues = selectedMenu
    ? {
        ...selectedMenu,
        status: String(selectedMenu.status),
      }
    : undefined;

  if (loading) {
    return (
      <Center h={300}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <AppBreadcrumbs
        items={[{ label: "Menu Control" }, { label: "Menu Setup" }]}
        showSwitch
        switchLabel="View archived"
        switchChecked={showArchived}
        onSwitchChange={setShowArchived}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        <Card
          p="xs"
          radius="sm"
          shadow="xs"
          onClick={() => {
            setDrawerMode("add");
            setSelectedMenu(null);
            setDrawerOpen(true);
          }}
          style={{
            cursor: "pointer",
            background: "#F5F8FF",
            border: "1px dashed #bbb",
            minHeight: 120,
          }}
        >
          <Stack
            align="center"
            justify="center"
            h="100%"
            gap={4}
          >
            <IconPlus size={40} color="#FF3951" />
            <Text fw={600}>Add Menu</Text>
          </Stack>
        </Card>


        {menus
          .filter((m) => (showArchived ? true : m.status !== 2))
          .filter((m) => m.menuLevel === 1) 
          .map((menu) => (
            <EntitiyCard
              key={menu.id}
              onView={hasChildren(menu) ? () => fetchMenuTree(menu.id) : undefined}
              title={menu.menuName}
              description={menu.menuDesc}
              iconBase64={menu.menuIcon}
              status={menu.status}
              actions
              onEdit={canWrite ? () => {
                setSelectedMenu(menu);
                setDrawerMode("edit");
                setDrawerOpen(true);
              } : undefined}
              onDelete={canWrite ? () => {
                setSelectedMenu(menu);
                setDeleteModalOpen(true);
              } : undefined}
              meta={[
                { label: "Code", value: menu.menuCode },
                { label: "Level", value: menu.menuLevel },
                { label: "URL", value: menu.menuUrl },
              ]}
            />
          ))}
      </SimpleGrid>

      {/* <DrawerForm
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerMode === "add" ? "Add Menu" : "Edit Menu"}
        fields={menuFields}
        onSubmit={handleSubmitMenu}
        initialValues={editInitialValues}
      /> */}

      {canWrite && (
        <DrawerForm
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={drawerMode === "add" ? "Add Menu" : "Edit Menu"}
          fields={menuFields}
          onSubmit={handleSubmitMenu}
          initialValues={editInitialValues}
        />
      )}

      <MenuTree
        opened={treeModalOpen}
        onClose={() => setTreeModalOpen(false)}
        title={`Menu structure - ${selectedMenuForTree?.menuName}`}
        tree={menuTreeData}
        onAdd={canWrite ? (node) => {
          setDrawerMode("add");
          setSelectedMenu({
            parentMenu: node.menuCode,
            id: "",
            menuCode: 0,
            menuDesc: "",
            menuName: "",
            menuLevel: node.menuLevel + 1,
            menuSeq: 0,
            menuUrl: "",
            status: 1,
            menuIcon: null,
          });
          setTreeModalOpen(false);
          setDrawerOpen(true);
        } : () => {}}
        onEdit={canWrite ? (node) => {
          setDrawerMode("edit");
          setSelectedMenu({
            id: node.id,
            menuCode: node.menuCode,
            menuDesc: node.menuDesc,
            menuName: node.menuName,
            parentMenu: node.parentMenu,
            menuLevel: node.menuLevel,
            menuSeq: node.menuSeq,
            menuUrl: node.menuUrl,
            status: 1,
            menuIcon: null,
          });
          setTreeModalOpen(false);
          setDrawerOpen(true);
        } : () => {}}
        onDelete={canWrite ? (node) => {
          setSelectedMenu({
            id: node.id,
            menuCode: node.menuCode,
            menuDesc: node.menuDesc,
            menuName: node.menuName,
            parentMenu: node.parentMenu,
            menuLevel: node.menuLevel,
            menuSeq: 0,
            menuUrl: "",
            status: 1,
            menuIcon: null,
          });
          // confirmDelete(node.id);
          setTreeModalOpen(false)
          setDeleteModalOpen(true);
        } : () => {}}
      />

      <CustomModal
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedMenu(null);
        }}
        icon={<IconX size={48} color="red" />}
        title="Delete Menu"
        subtext={`Are you sure you want to delete "${selectedMenu?.menuName}"? This action cannot be undone.`}
        actionText={deleteLoading ? "Deleting..." : "Delete"}
        onAction={() => selectedMenu?.id && confirmDelete(selectedMenu.id)}
        showCancel
        cancelText="Cancel"
        size="sm"
      />
    </>
  );
};

export default MenuSetup;