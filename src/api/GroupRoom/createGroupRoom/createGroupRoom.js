import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createGroupRoom: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { coverPhoto, roomName, userName } = args;
            
            try {
                const groupRoom = await prisma.createGroupRoom({
                    coverPhoto,
                    roomName,
                    founderUser: {
                        connect: {
                            userName: user.userName
                        }
                    }
                });

                const groupRoomMember = await prisma.createGroupRoomMember({
                    groupRoom: {
                        connect: {
                            id: groupRoom.id     
                        }
                    },
                    participants: {
                        connect: {
                            userName: user.userName
                        }
                    }
                });

                userName.forEach(
                    async userName =>
                        await prisma.updateGroupRoomMember({
                            data: {
                                participants: {
                                    connect: {
                                        userName
                                    }
                                }
                            },
                            where:{ id: groupRoomMember.id }
                        })
                );

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};