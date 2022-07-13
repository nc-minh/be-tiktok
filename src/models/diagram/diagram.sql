CREATE TABLE [user] (
  [_id] nvarchar(255) PRIMARY KEY,
  [fullname] nvarchar(255),
  [username] nvarchar(255) UNIQUE,
  [password] nvarchar(255),
  [avatar] nvarchar(255),
  [bio] nvarchar(255),
  [is_enabled] boolean,
  [is_deleted] boolean,
  [tick] boolean,
  [followings_count] int DEFAULT (0),
  [followers_count] int DEFAULT (0),
  [likes_count] int DEFAULT (0),
  [website_url] nvarchar(255),
  [social_network] Array,
  [role] nvarchar(255),
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [follower] (
  [follower_id] nvarchar(255),
  [user_id] nvarchar(255),
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [following] (
  [following_id] nvarchar(255),
  [user_id] nvarchar(255),
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [category] (
  [_id] nvarchar(255) PRIMARY KEY,
  [category_name] nvarchar(255),
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [post] (
  [_id] nvarchar(255) PRIMARY KEY,
  [user_id] nvarchar(255),
  [contents] nvarchar(255),
  [media_url] nvarchar(255),
  [category_id] Array,
  [reaction_count] int DEFAULT (0),
  [view_count] int DEFAULT (0),
  [is_deleted] boolean,
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [post_reaction] (
  [user_id] nvarchar(255),
  [post_id] nvarchar(255),
  [type] nvarchar(255) NOT NULL CHECK ([type] IN ('like', 'love', 'haha', 'sad', 'angry')),
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [comment] (
  [_id] nvarchar(255),
  [user_id] nvarchar(255),
  [post_id] nvarchar(255),
  [contents] nvarchar(255),
  [media_url] nvarchar(255),
  [comment_reaction_count] int,
  [created_at] datetime,
  [updated_at] datetime
)
GO

CREATE TABLE [comment_reaction] (
  [user_id] nvarchar(255),
  [comment_id] nvarchar(255),
  [type] nvarchar(255) NOT NULL CHECK ([type] IN ('like', 'love', 'haha', 'sad', 'angry')),
  [created_at] datetime,
  [updated_at] datetime
)
GO

ALTER TABLE [post] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([_id])
GO

ALTER TABLE [category] ADD FOREIGN KEY ([_id]) REFERENCES [post] ([category_id])
GO

ALTER TABLE [follower] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([_id])
GO

ALTER TABLE [following] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([_id])
GO

ALTER TABLE [post_reaction] ADD FOREIGN KEY ([post_id]) REFERENCES [post] ([_id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([_id]) REFERENCES [post_reaction] ([user_id])
GO

ALTER TABLE [comment] ADD FOREIGN KEY ([post_id]) REFERENCES [post] ([_id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([_id]) REFERENCES [comment] ([user_id])
GO

ALTER TABLE [comment_reaction] ADD FOREIGN KEY ([comment_id]) REFERENCES [comment] ([_id])
GO

ALTER TABLE [user] ADD FOREIGN KEY ([_id]) REFERENCES [comment_reaction] ([user_id])
GO
