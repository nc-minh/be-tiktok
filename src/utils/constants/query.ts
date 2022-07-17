export const QUERY_IGNORE = '-password -is_deleted -is_enabled -role';

export const QUERY_LOCKED_IGNORE = {
  is_deleted: false,
  is_enabled: true,
};

export const QUERY_DELETED_IGNORE = {
  is_deleted: false,
};

export const QUERY_DELETED = {
  is_deleted: true,
};

export const QUERY_ENABLED = {
  is_enabled: true,
};

export const QUERY_DISABLED = {
  is_enabled: false,
};

export const PAGE_SIZE = 20;
