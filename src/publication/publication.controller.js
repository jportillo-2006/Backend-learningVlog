import Publication from './publication.model.js';

export const savePublication = async (req, res) => {
    try {
        const data = req.body;

        const publication = new Publication(data);
        await publication.save();

        res.status(200).json({
            success: true,
            message: 'Publication saved successfully',
            publication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving publication',
            error
        });
    }
};

export const searchPublication = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publication found',
            publication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching publication',
            error
        });
    }
};

export const updatePublication = async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, updatedAt, ...data } = req.body;

    try {
        const publication = await Publication.findByIdAndUpdate(id, data, { new: true });

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publication updated successfully',
            publication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating publication',
            error
        });
    }
};

export const getPublications = async (req, res) => {
    const { limite = 10, desde = 0, course } = req.query;
    const query = { status: true };

    if (course) {
        query.course = course;
    }

    try {
        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .sort({ createdAt: -1 })
        ]);

        res.status(200).json({
            success: true,
            total,
            publications
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching publications',
            error
        });
    }
};

export const deletePublication = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findByIdAndUpdate(id, { status: false });

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publication deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting publication',
            error
        });
    }
};