package com.example.demo.controller;

        import com.example.demo.model.Dashboard;
        import com.example.demo.repos.DashboardRepository;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.Valid;
        import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/apiDash")
public class DashboardController {


    private DashboardRepository repository;


    public DashboardController(DashboardRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/dashboard")
    public List<Dashboard> index() {
        return repository.findAll();

    }

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.GET)
    public Dashboard get(@PathVariable("id") String id) {
        return repository.findById(id).get();
    }


    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.PUT)
    public Dashboard update(@PathVariable("id") String id, @Valid @RequestBody Dashboard dashboard) {
        dashboard.set_id(id);
        repository.save(dashboard);
        return dashboard;
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.POST)
    public Dashboard store(@Valid @RequestBody Dashboard dashboard) {
        repository.save(dashboard);
        return dashboard;
    }

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        repository.delete(repository.findById(id).get());
    }

}
