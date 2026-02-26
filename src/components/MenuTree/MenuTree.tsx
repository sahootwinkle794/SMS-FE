"use client";
import { Modal, Card, Group, Text, ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react";
import { CSSProperties } from "react";

export interface TreeNode {
  menuSeq: number;
  menuUrl: string | undefined;
  id: string;
  menuCode: number;
  menuName: string;
  menuDesc: string;
  menuLevel: number;
  parentMenu: number;
  children?: TreeNode[];
}

interface Props {
  opened: boolean;
  onClose: () => void;
  title: string;
  tree: TreeNode[];
  onAdd: (node: TreeNode) => void;
  onEdit: (node: TreeNode) => void;
  onDelete: (node: TreeNode) => void;
}

const nodeBoxStyle: CSSProperties = {
  padding: "12px 18px",
  background: "#ecf0fcff",
  borderRadius: 8,
  border: "1px solid #bcc3dfff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  minWidth: 160,
  cursor: "pointer"
};

export const MenuTree = ({
  opened,
  onClose,
  title,
  tree,
  onAdd,
  onEdit,
  onDelete
}: Props) => {
  const renderNode = (node: TreeNode) => {
    return (
      <div
        key={node.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Card shadow="sm" padding="sm" style={nodeBoxStyle}>
          <Group justify="space-between">
            <Text fw={600}>{node.menuName}</Text>
            <Group gap={4}>
              {/* <Tooltip label="Add submenu">
                <ActionIcon
                  size="sm"
                  variant="light"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(node);
                  }}
                >
                  <IconPlus size={14} />
                </ActionIcon>
              </Tooltip> */}
              <Tooltip label="Edit menu">
                <ActionIcon
                  size="sm"
                  variant="light"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(node);
                  }}
                >
                  <IconPencil size={14} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(node);
                  }}
                >
                  <IconTrash size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Card>

        {node.children && node.children.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 0
            }}
          >
            {/* vertical connector from parent */}
            <div
              style={{
                width: 2,
                height: 30,
                borderLeft: "2px dashed #ddd"
              }}
            />
            {/* horizontal connector line */}
            <div
              style={{
                display: "flex",
                gap: 50,
                position: "relative"
              }}
            >
              {/* horizontal line connecting children */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  borderTop: "2px dashed #ddd",
                  transform: "translateY(-50%)"
                }}
              />
              {node.children.map((child, index) => (
                <div
                  key={child.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative"
                  }}
                >
                  {/* vertical line from horizontal to child */}
                  <div
                    style={{
                      width: 2,
                      height: 30,
                      borderLeft: "2px dashed #ddd"
                    }}
                  />
                  {renderNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      centered 
      size="95%"
      padding={0}
      styles={{
        header: {
          margin: 0,
          padding: "16px 24px",
          borderBottom: "1px solid #e9ecef"
        },
        title: {
          fontWeight: 800,
          width: "100%",
          textAlign: "center",
          flex: 1
        },
        body: {
          padding: 0,
          height: "75vh",
          overflow: "hidden"
        }
      }}
      title={title}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowX: "auto",
          overflowY: "auto",
          padding: "24px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 80,
            minWidth: "max-content",
            minHeight: 300
          }}
        >
          {tree.map((root) => renderNode(root))}
        </div>
      </div>
    </Modal>
  );
};