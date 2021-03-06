import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { text, postId } = args;
            
            return prisma.createComment({
                user: {
                    connect: {
                    id: user.id
                    }
                },
                post: {
                    connect: {
                    id: postId
                    }
                },
                text
            });
        }
    }
};