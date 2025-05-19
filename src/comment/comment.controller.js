import Comment from './comment.model.js';

export const saveComment = async (req, res) => {
    try {
        console.log("Body recibido en saveComment:", req.body);
        const { publication, name, content } = req.body;

        const comment = new Comment({
            name,
            content,
            publicationId: publication
        });

        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment saved successfully',
            comment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error saving comment',
            error: error.message
        });
    }
};

export const searchComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comment found',
            comment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar comentario',
            error
        });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, updatedAt, ...data } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, data, { new: true });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            comment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating comment',
            error
        });
    }
};

export const getComments = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const comments = await Comment.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Comment.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching comments',
            error
        });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { status: false });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error deleting comment',
            error
        });
    }
};

export const getCommentsByPublication = async (req, res) => {
    const { publicationId } = req.params;

    try {
        const comments = await Comment.find({ publicationId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching comments',
            error
        });
    }
};