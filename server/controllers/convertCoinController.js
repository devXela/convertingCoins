exports.convert_coin = function(req, res) {
    res.send({
        status: 200,
        value: req.params.valueToConvert}
        );
}