
const StoryChannel = {
    Blog: "BLOG",
    Tv: "TV",
    Radio: "RADIO"
}

const StoryStatus = {
    Open: "OPEN",
    Submitted: "Submitted",
    Approved: "APPROVED",
    Published: "PUBLISHED",
    Rejected: "REJECTED",
    Scheduled: "SCHEDULED"
}

const StorySectionType = {
    Text: "TEXT",
    Image: "IMAGE"
}

const Permissions = {
    User: {
        Read: "User.Read",
        Create: "User.Create",
        Update: "User.Update",
        Delete: "User.Delete"
    },
    Role: {
        Read: "Role.Read",
        Create: "Role.Create",
        Update: "Role.Update",
        Delete: "Role.Delete"
    },
    Story: {
        Read: "Story.Read",
        Create: "Story.Create",
        Update: "Story.Update",
        Delete: "Story.Delete"
    },
    Category: {
        Read: "Category.Read",
        Create: "Category.Create",
        Update: "Category.Update",
        Delete: "Category.Delete"
    },
    Image: {
        Read: "Image.Read",
        Create: "Image.Create",
        Update: "Image.Update",
        Delete: "Image.Delete"
    },
    Comment: {
        Read: "Comment.Read",
        Create: "Comment.Create",
        Update: "Comment.Update",
        Delete: "Comment.Delete"
    }
}

module.exports = { StoryChannel, StoryStatus, StorySectionType, Permissions }