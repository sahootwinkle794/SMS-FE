"use client";

import { useState } from "react";
import {
  Card,
  Group,
  Checkbox,
  Switch,
  Stack,
  Text,
  Divider,
  Select,
  Button,
} from "@mantine/core";
import { EntitiyCard } from "@/components";
import { useRoles } from "@/hooks/useRoles";
import { getRequest, postRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { ApiResponse } from "@/types/api/auth/verify-otp/verifyOtp";
import { notifications } from "@mantine/notifications";
import { useMenuPermissionsStore } from "@/store/menuPermissions.store";
import {
  PermissionPayload,
  MenuPayload,
  SubmitPayload,
  MenuItem,
  SubmitResponse,
  RWState,
} from "@/types/superAdmin/menuManagement/rolePermission//rolePermission";

/* ================= PAGE ================= */

const RolePermission = () => {
  const { roles } = useRoles();
  const { refreshPermissions } = useMenuPermissionsStore();
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState<MenuItem | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  /** Checkbox → canApprove */
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  /** Read / Write switches */
  const [rwMap, setRwMap] = useState<Record<string, RWState>>({});

  /* ================= ROLE CHANGE ================= */

  const handleRoleChange = async (value: string | null) => {
    if (!value) return;

    setSelectedRoleId(value);

    const result = await getRequest<ApiResponse<MenuItem[]>>(
      `${API_PATH.GET_ROLE_MENU_PERMISSIONS}/${value}`
    );

    if (result.status !== 200) return;

    const menus = result.data;

    const nextCheckedMap: Record<string, boolean> = {};
    const nextRwMap: Record<string, RWState> = {};

    const walk = (menu: MenuItem) => {
      nextCheckedMap[menu.menuId] = menu.permissions.canApprove;

      nextRwMap[menu.menuId] = {
        read: menu.permissions.canRead,
        write: menu.permissions.canWrite,
      };

      menu.children?.forEach(walk);
    };

    menus.forEach(walk);

    setMenuData(menus);
    setCheckedMap(nextCheckedMap);
    setRwMap(nextRwMap);
    setActiveMenu(null);
  };

  /* ================= PERMISSION RESOLVER ================= */

  const resolvePermissions = (
    menu: MenuItem,
    isParent: boolean
  ): PermissionPayload => {
    if (isParent) {
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canApprove: true,
      };
    }

    const isChecked = checkedMap[menu.menuId] === true;
    const rw = rwMap[menu.menuId] || { read: false, write: false };

    return {
      canRead: isChecked && rw.read,
      canWrite: isChecked && rw.write,
      canDelete: false,
      canApprove: isChecked,
    };
  };

  /* ================= PAYLOAD BUILDER ================= */

  const buildMenuPayload = (menu: MenuItem, isParent = false): MenuPayload => ({
    menuUnqId: menu.menuId,
    permissions: resolvePermissions(menu, isParent),
    children: menu.children?.map((child) => buildMenuPayload(child, false)),
  });

  /* ================= SUBMIT ================= */

  const _handleToSubmit = async () => {
    if (!selectedRoleId || !activeMenu) return;

    const payload: SubmitPayload = {
      roleUnqId: selectedRoleId,
      menus: [buildMenuPayload(activeMenu, true)],
    };

    const result = await postRequest<
      SubmitPayload,
      ApiResponse<SubmitResponse>
    >(API_PATH.SUBMIT_ROLE_MENU_PERMISSIONS, payload);

    if (result.status === 201) {
      notifications.show({
        title: "Successful!",
        message: result.data.message,
        color: "green",
      });
      console.log("refresh called");
      refreshPermissions();
      console.log("after refresh called");
    }
  };

  /* ================= CARD RENDER ================= */

  const renderCard = (items: MenuItem[], title: string) => (
    <Card shadow="sm" withBorder radius="md" w={420}>
      <Text fw={600} mb="sm">
        {title}
      </Text>
      <Divider mb="sm" />

      <Stack gap="sm">
        {items.map((item) => (
          <Group key={item.menuId} justify="space-between">
            <Checkbox
              label={item.menuName}
              checked={checkedMap[item.menuId] ?? false}
              onChange={(e) =>
                setCheckedMap((prev) => ({
                  ...prev,
                  [item.menuId]: e.currentTarget.checked,
                }))
              }
            />

            <Group gap="md">
              <Switch
                label="Read"
                size="sm"
                color="orange"
                checked={rwMap[item.menuId]?.read ?? false}
                disabled={!checkedMap[item.menuId]}
                onChange={(e) =>
                  setRwMap((prev) => ({
                    ...prev,
                    [item.menuId]: {
                      ...prev[item.menuId],
                      read: e.currentTarget.checked,
                    },
                  }))
                }
              />

              <Switch
                label="Write"
                size="sm"
                color="green"
                checked={rwMap[item.menuId]?.write ?? false}
                disabled={!checkedMap[item.menuId]}
                onChange={(e) =>
                  setRwMap((prev) => ({
                    ...prev,
                    [item.menuId]: {
                      ...prev[item.menuId],
                      write: e.currentTarget.checked,
                    },
                  }))
                }
              />
            </Group>
          </Group>
        ))}
      </Stack>
    </Card>
  );

  /* ================= JSX ================= */

  return (
    <>
      {/* Role + Submit */}
      <Group justify="space-between" align="flex-end" mb="md">
        <Select
          label="Role"
          placeholder="-- Select Role --"
          w={250}
          data={roles.map((role) => ({
            value: role.id,
            label: role.roleName,
          }))}
          onChange={handleRoleChange}
        />

        <Button
          color="var(--danger)"
          disabled={!activeMenu}
          onClick={_handleToSubmit}
        >
          Submit
        </Button>
      </Group>

      <Divider my="md" label="Menu List" labelPosition="center" />

      {/* Parent Menus */}
      <Group mb="md">
        {menuData.map((menu) => (
          <div
            key={menu.menuId}
            style={{
              cursor: "pointer",
              border:
                activeMenu?.menuId === menu.menuId
                  ? "2px solid var(--danger)"
                  : "2px solid transparent",
              borderRadius: 6,
            }}
          >
            <EntitiyCard
              title={menu.menuName}
              iconBase64={menu.menuIcon}
              onClickCard={() => setActiveMenu(menu)}
            />
          </div>
        ))}
      </Group>

      {/* Child Menus */}
      {activeMenu?.children?.length &&
        renderCard(activeMenu.children, `${activeMenu.menuName} - Child Menus`)}
    </>
  );
};

export default RolePermission;
